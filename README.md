<div align="center">
<a href="https://l3montree.com"><img align="center" width="150" src=https://l3montree.com/_next/image?url=https%3A%2F%2Fcms.l3montree.com%2Fuploads%2FX_Invoice_Logo_abc7b64e24.svg&w=48&q=75 /></a>
<div align="left">

# X-Invoice-Generator

_Eine deutschsprachige [README](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/blob/master/README_DE.md) kann hier gefunden werden._

Welcome! This is the place where an open and free generator for X-Invoices is created. According to the decision of the IT Planning Council of June 22nd, 2017, X-Invoices are decisive for the implementation of Directive 2014/55/EU in Germany. This generator tries to implement the specifications in a simple and open way and to make them easy to use for everyone.

Main technical reference (e.g. specs for types of fields) is the official standard in Version 2.0.0 (30.06.2020). You can download the german document [here](https://www.xoev.de/sixcms/media.php/13/200-XRechnung-2020-06-30.pdf).

The used syntax is UBL (Universal Business Language). Basically there is still the CII syntax, but it is less powerful. Documentation of the syntax is available from PEPPOL - [link](https://docs.peppol.eu/poacc/billing/3.0/syntax/ubl-invoice/tree/).

This software is developed by [l3montree](https://l3montree.com), on the initiative of [Neuland@Homeland GmbH](https://neuland-homeland.de), open to contributions and input from anyone.

## Download and install

You can download the software from the [release](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/releases) page. There are packed installers for Windows (64-bit exe), Linux (amd64 for Debian) and OS X (dmg) available.

### Table of content:

1. Start & Develop
2. Mapping of a specific invoice template
3. Example X-Invoices
4. Design/ UI
5. Other
6. License
7. Privacy Notice

### Start & Develop

1. Clone the project.
2. Go into your project-directory.
3. Run `npm install`.
4. Run the application in development mode: `npm run dev`

If you need more details just have a look at the `package.json` file.

### Mapping of a specific invoice template

The structure of the project is intended to make it easy to adopt the basic standard for specific cases. In the project, the specifications of the standard are therefore mapped in UBL syntax. Since different organizations or companies usually only need specific fields of an invoice they can be used easily from the basic standard. An example for the specifications of the **"Deutsche Bahn"** can be found in the [Wiki](<https://gitlab.com/l3montree/x-invoice-generator/-/wikis/documentation/specific_requirements_XInvoice/Deutsche_Bahn/Deutsche_Bahn_XInvoice_Requirements_(UBL)>). The current version [v0.0.1](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/releases) is especially designed to fit the requirements of the **"Deutsche Bahn"**. Further information regarding X-Invoices and **"Deutsche Bahn"** can be found at their [FAQ](https://www.deutschebahn.com/de/geschaefte/lieferantenportal/informationsservice/FAQs-rund-um-das-Thema-Rechnungsstellung-5570102).

### Example X-Invoices

You can download example X-Invoices in UBL and CII Standard [here](https://basket.l3montree.com/s/BwpsnCQRTfiRckW).

### Credits

The starting basis for the development was the [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - check it out on GitHub.

## License

X-Invoice-Generator
Copyright (C) 2020 l3montree

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.

## Privacy Notice

If you download, install and execute the X-Invoice Generator as build and released you agree that we (l3montree UG (haftungsbeschränkt)) are allowed to capture critical errors using the service [Sentry](https://sentry.io/privacy/). We are only receiving the following data, which we use exclusively to improve this software:

- Used operating system and version (e.g. Windows 10.0.18363)
- The exception content (e.g. "Cannot find channel "latest.yml" update info: HttpError: 404")

- Used version of this software (e.g. "0.0.1")
- Device architecture and family (e.g. "x64, Desktop")
- Runtime information (e.g. "Node 12.12.0, Electron 8.5.3")

You also agree that we are allowed to may temporarily store meta connection data (used OS, version of this software, date and time of request and IPv4/ IPv6 address). We collect this data when you start the application, and it is checking for updates. Our webserver and proxy infrastructure that serves information about the latest version and the latest binaries needs to process this information to be able to communicate with your device.

If you have any question regarding this topic, please feel free to contact us: info@l3montree.com
