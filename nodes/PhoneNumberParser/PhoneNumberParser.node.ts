import {
	deepCopy,
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import parsePhoneNumber, {
	CountryCode,
	getCountries,
	isSupportedCountry,
} from 'libphonenumber-js/max';

export class PhoneNumberParser implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Phone Number Parser',
		name: 'phoneNumberParser',
		icon: 'file:phonenumbeparser.svg',
		group: ['transform'],
		version: 1,
		description: 'Parse a phone number and return its information',
		defaults: {
			name: 'Phone Number Parser',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [],
		properties: [
			{
				displayName: 'Keep Only Set',
				name: 'keepOnlySet',
				type: 'boolean',
				default: false,
				description:
					'Whether only the values set on this node should be kept and all others removed',
			},
			{
				displayName: 'Default Country',
				name: 'defaultCountry',
				type: 'options',
				required: true,
				options: getCountries().map((country) => ({
					name: country as string,
					value: country as string,
				})),
				default: '',
				placeholder: 'US',
				description: 'Phone Number to formatted',
			},
			{
				displayName: 'Phone Number',
				name: 'phonenumber',
				type: 'string',
				required: true,
				description: 'The phone number to parse',
				default: '',
				placeholder: '+1 555 555 5555',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();

		if (items.length === 0) {
			items.push({ json: {} });
		}

		const returnData: INodeExecutionData[] = [];

		let item: INodeExecutionData;
		let keepOnlySet: boolean;
		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			keepOnlySet = this.getNodeParameter('keepOnlySet', itemIndex, false) as boolean;
			item = items[itemIndex];

			const newItem: INodeExecutionData = {
				json: {},
				pairedItem: item.pairedItem,
			};

			if (!keepOnlySet) {
				if (item.binary !== undefined) {
					newItem.binary = {};
					Object.assign(newItem.binary, item.binary);
				}
				newItem.json = deepCopy(item.json);
			}

			const number = this.getNodeParameter('phonenumber', itemIndex, '') as string | null;
			const defaultCountry = (
				(this.getNodeParameter('defaultCountry', itemIndex, '') as string | null) ?? ''
			).toUpperCase() as CountryCode;

			let phoneNumber = undefined;
			if (isSupportedCountry(defaultCountry)) {
				phoneNumber = parsePhoneNumber(`${number}`, defaultCountry);
			}

			newItem.json.country = phoneNumber?.country ?? '';
			newItem.json.countryCallingCode = phoneNumber?.countryCallingCode ?? '';
			newItem.json.nationalNumber = phoneNumber?.nationalNumber ?? '';

			// NATIONAL — Example: "(213) 373-4253"
			// INTERNATIONAL — Example: "+1 213 373 4253"
			// E.164 — Example: "+12133734253"
			// RFC3966 (the phone number URI) — Example: "tel:+12133734253;ext=123"
			newItem.json.formatNational = phoneNumber?.format('NATIONAL') ?? '';
			newItem.json.formatInternational = phoneNumber?.format('INTERNATIONAL') ?? '';
			newItem.json.formatE164 = phoneNumber?.format('E.164') ?? '';
			newItem.json.formatRFC3966 = phoneNumber?.format('RFC3966') ?? '';

			newItem.json.possible = phoneNumber?.isPossible() ?? false;
			newItem.json.valid = phoneNumber?.isValid() ?? false;
			newItem.json.nonGeographic = phoneNumber?.isNonGeographic() ?? false;

			newItem.json.type = phoneNumber?.getType() ?? '';

			// PhoneNumber class instance has the following properties:

			// number: string — The phone number in E.164 format. Example: "+12133734253".
			// countryCallingCode: string — The country calling code. Example: "1".
			// nationalNumber: string — The national (significant) number. Example: "2133734253".
			// country: string? — The country code. Example: "US". Will be undefined when no country could be derived from the phone number. For example, when several countries have the same countryCallingCode and the nationalNumber doesn't look like it belongs to any of them. Or when a number belongs to a non-geographic numbering plan.
			// ext: string? — The phone number extension, if any. Example: "1234".
			// carrierCode: string? — The "carrier code", if any. Example: "15". "Carrier codes" are only used in Colombia and Brazil and only when dialing within those countries from a mobile phone to a fixed line number.

			returnData.push(newItem);
		}

		return this.prepareOutputData(returnData);
	}
}
