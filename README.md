# n8n-nodes-phonenumber-parser

[![version](https://img.shields.io/npm/v/@splainez/n8n-nodes-phonenumber-parser.svg)](https://www.npmjs.org/package/@splainez/n8n-nodes-phonenumber-parser)

## Description

The `PhoneNumberParser` node is a useful tool for working with phone numbers in your n8n workflows. This node uses the `libphonenumber-js` library to format phone numbers into human-readable formats and extract useful information from them, such as the country code, area code, and phone number itself.


Alternatively, you can clone the repository from Github and build the package yourself.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Usage

To use the `PhoneNumberParser` node in your n8n workflows, simply drag and drop the node from the node palette onto your workflow canvas. Then, connect the output of any preceding nodes to the input of the `PhoneNumberParser` node.

The `PhoneNumberParser` node has a single input parameter, the phone number to be formatted. This should be a string containing only digits. Once the node receives the phone number, it will automatically format it into a human-readable format and extract useful information from it, such as the country code, area code, and phone number itself. The formatted phone number will be output as a JSON object containing these different fields.

This node parses a phone number using the libphonenumber-js library and returns its information in JSON format. The following information is included in the output:

* `country`: The country code of the phone number.
* `countryCallingCode`: The country calling code of the phone number.
* `nationalNumber`: The national (significant) number of the phone number.
* `formatNational`: The phone number formatted in the national format.
* `formatInternational`: The phone number formatted in the international format.
* `formatE164`: The phone number formatted in the E.164 format.
* `formatRFC3966`: The phone number formatted in the RFC3966 format.
* `possible`: Whether the phone number is possible (i.e., it is a valid phone number but not necessarily assigned to a specific user or location).
* `valid`: Whether the phone number is valid (i.e., it is a valid phone number and is assigned to a specific user or location).
* `nonGeographic`: Whether the phone number is non-geographic (i.e., it is not assigned to a specific geographic location).
* `type`: The type of the phone number (e.g., FIXED_LINE_OR_MOBILE, MOBILE, FIXED_LINE, TOLL_FREE, etc.).


## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.

This project uses the `libphonenumber-js` library, which is licensed under the MIT License. See the `libphonenumber-js/LICENSE` file for more details.
