## X-Invoice-Generator

Welcome! This is the place where an open and free generator for X-Invoices is created. According to the decision of the IT Planning Council of June 22nd, 2017, X-Invoices are decisive for the implementation of Directive 2014/55/EU in Germany. This generator tries to implement the specifications in a simple and open way and to make them easy to use for everyone.

Main technical reference (e.g. specs for types of fields) is the official standard in Version 2.0.0 (30.06.2020). You can download the german document [here](https://www.xoev.de/sixcms/media.php/13/200-XRechnung-2020-06-30.pdf).

The used syntax is UBL (Universal Business Language). Basically there is still the CII syntax, but it is less powerful. Documentation of the syntax is available from PEPPOL - [link](https://docs.peppol.eu/poacc/billing/3.0/syntax/ubl-invoice/tree/).

This software is developed by [l3montree](https://l3montree.com), on the initiative of [Neuland@Homeland GmbH](https://neuland-homeland.de), open to contributions and input from anyone.


### Download and install

You can download the software from the [release](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/releases) page. There are packed installers for Windows (64-bit exe), Linux (amd64 for Debian) and OS X (dmg) available.


### Table of content:

1. Start & Develop
2. Mapping of a specific invoice template
3. Example X-Invoices
4. Design/ UI
5. Other



### Start & Develop

1. Clone the project.
2. Go into your project-directory.
3. Run `npm install`.
4. Run the application in development mode: `npm run dev`

If you need more details just have a look at the `package.json` file.



### Mapping of a specific invoice template 

The structure of the project is intended to make it easy to adopt the basic standard for specific cases. In the project, the specifications of the standard are therefore mapped in UBL syntax. Since different organizations or companies usually only need specific fields of an invoice they can be used easily from the basic standard. An example for the specifications of the "Deutsche Bahn" can be found in the [Wiki](https://gitlab.com/l3montree/x-invoice-generator/-/wikis/documentation/specific_requirements_XInvoice/Deutsche_Bahn/Deutsche_Bahn_XInvoice_Requirements_(UBL)).



### Example X-Invoices

You can download example X-Invoices in UBL and CII Standard [here](https://basket.l3montree.com/s/BwpsnCQRTfiRckW).



### Design/ UI

You can download a mockup as Adobe XD file [here](https://basket.l3montree.com/s/icJAQEAgT8nCNTS) or as PDF [here](https://basket.l3montree.com/s/gSR2PnYjYC9tQJk).

| Functionality        | Color Code |
| -------------------- | ---------- |
| Primary              | #369EFF    |
| Secondary/ undefined | #BABABA    |
| Danger               | #F5576C    |
| Success              | #43D97D    |
| Background           | #123F65    |



### Credits

The starting basis for the development was the [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) - check it out on GitHub.



### License

X-Invoice-Generator
Copyright (C) 2020 l3montree

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <http://www.gnu.org/licenses/>.

