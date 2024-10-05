# n8n-nodes-phonenumber-parser

[![version](https://img.shields.io/npm/v/@splainez/n8n-nodes-phonenumber-parser.svg)](https://www.npmjs.org/package/@splainez/n8n-nodes-phonenumber-parser)

## Description

The `PhoneNumberParser` node is a powerful tool for working with phone numbers in your n8n workflows. It uses the `libphonenumber-js` library to format phone numbers into human-readable formats and extract useful information, such as the country code, area code, and phone number.


You can also clone the repository from GitHub and build the package yourself.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n Community Nodes documentation.

## Usage

To use the `PhoneNumberParser` node in your n8n workflows, drag and drop the node from the node palette onto your workflow canvas. Then, connect the output of any preceding node to the input of the `PhoneNumberParser` node.

The `PhoneNumberParser` node has a single input parameter: the phone number to be formatted. This should be a string containing only digits. Once the node receives the phone number, it will automatically format it into a human-readable format and extract useful information, such as the country code, area code, and phone number. The formatted phone number will be output as a JSON object containing these fields.

This node parses a phone number using the `libphonenumber-js` library and returns its information in JSON format. The following information is included in the output:

* `country`: The country code associated with the phone number.
* `countryCallingCode`: The country calling code of the phone number.
* `nationalNumber`: The national (significant) part of the phone number.
* `formatNational`: The phone number formatted in national format.
* `formatInternational`: The phone number formatted in international format.
* `formatE164`: The phone number formatted in E.164 format.
* `formatRFC3966`: The phone number formatted in RFC3966 format.
* `possible`: Whether the length of the phone number is valid, although it may not necessarily be correctly formatted.
* `valid`: Whether the phone number is valid, based on both length and format.
* `nonGeographic`: Whether the phone number is non-geographic (i.e., not tied to a specific location).
* `type`: The type of phone number (e.g., FIXED_LINE_OR_MOBILE, MOBILE, FIXED_LINE, TOLL_FREE, etc.).


## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

This project uses the `libphonenumber-js` library, which is also licensed under the MIT License. See the `libphonenumber-js/LICENSE` file for more details.
