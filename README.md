## X-Invoice-Generator

This document will explain the basics concepts for the X-Invoice-Generator. According to the decision of the IT Planning Council of June 22nd, 2017, X-Invoices are decisive for the implementation of Directive 2014/55/EU in Germany. This Generator tries to implement the specifications in a simple and open way and to make them easy to use for everyone.

Main technical reference (e.g. specs for types of fields) is the official standard in Version 2.0.0 (30.06.2020). You can download the german document [here](https://www.xoev.de/sixcms/media.php/13/200-XRechnung-2020-06-30.pdf).

This software is developed by [l3montree](https://l3montree.com), on the initiative of [Neuland@Homeland GmbH](https://neuland-homeland.de), open to contributions and input from anyone.



### Table of content:

1. Start & Develop
2. [Needed elements of an invoice](https://gitlab.com/l3montree/x-invoice-generator#needed-elements-of-an-invoice) 
3. [Technical requirements](https://gitlab.com/l3montree/x-invoice-generator#technical-requirements)
4. [Example X-Invoices](https://gitlab.com/l3montree/x-invoice-generator#example-x-invoices)
5. [Design/ UI](https://gitlab.com/l3montree/x-invoice-generator#design-ui)
6. Other



### Start & Develop

1. Clone the project.
2. Go into your project-directory.
3. Run `yarn install`.
4. Run the application in development mode: `yarn dev`

If you need more details just have a look at the `package.json` file.



### Needed elements of an invoice

The common data needed for an invoice is:

| Standard Reference | Title                                               | Required | Quantity | Type           | Calculated        | Default                |
| ------------------ | --------------------------------------------------- | -------- | -------- | -------------- | ----------------- | ---------------------- |
| BT-1               | Invoice number ("Rechnungsnummer")                  | True     | 1        | String/ Number | False             |                        |
| BT-2               | Invoice issue date ("Rechnungsdatum")               | True     | 1        | Date           | False             | Current date           |
| BT-9               | Payment due date ("Fälligkeitsdatum")               | True     | 0..1     | Date           | False             | Current date + 14 days |
| BT-10              | Buyer reference ("Leitweg-ID")                      | True     | 1        | String         | False             |                        |
| BT-11              | Project reference ("Projektreferenz")               | False    | 0..1     | String         | False             |                        |
| BT-12              | Contract reference ("Vertragsreferenz")             | False    | 0..1     | String         | False             |                        |
| BT-13              | Purchase order reference ("Bestellnummer")          | False    | 0..1     | String         | False             |                        |
| BT-20              | Payment terms ("Zahlungsbedingungen")               | False    | 0..1     | String         | False             |                        |
| BT-22              | Invoice note ("Bemerkung")                          | True     | 1        | String         | False             | ""                     |
| BT-27              | Seller name ("Rechnungssteller")                    | True     | 1        | String         | False             |                        |
| BT-31              | Seller VAT identifier ("Umsatzsteuer-ID")           | False    | 0..1     | String         | False             |                        |
| BT-35              | Seller address line 1 ("Straße und Hausnummer")     | False    | 0..1     | String         | False             |                        |
| BT-36              | Seller address line 2 ("Adresszusatz")              | False    | 0..1     | String         | False             |                        |
| BT-37              | Seller city ("Ort")                                 | True     | 1        | String         | False             |                        |
| BT-38              | Seller post code ("PLZ")                            | True     | 1        | Number         | False             |                        |
| BT-40              | Seller country code ("Land") [ISO 3166-1]           | True     | 1        | String         | False             | "DE"                   |
| BT-41              | Seller contact point ("Ansprechpartner")            | True     | 1        | String         | False             |                        |
| BT-42              | Seller contact telephone number ("Telefonnummer")   | True     | 1        | Number         | False             | ""                     |
| BT-43              | Seller contact email address ("E-Mail-Adresse")     | True     | 1        | String/ Email  | False             |                        |
| BT-44              | Buyer name ("Rechnungsempfänger")                   | True     | 1        | String         | False             |                        |
| BT-48              | Buyer VAT identifier ("Umsatzsteuer-ID")            | False    | 0..1     | String         | False             |                        |
| BT-50              | Buyer address line 1 ("Straße und Hausnummer")      | False    | 0..1     | String         | False             |                        |
| BT-51              | Buyer address line 2 ("Adresszusatz")               | False    | 0..1     | String         | False             |                        |
| BT-52              | Buyer city ("Ort")                                  | True     | 1        | String         | False             |                        |
| BT-53              | Buyer postal code ("Postleitzahl")                  | True     | 1        | String         | False             |                        |
| BT-55              | Buyer country code ("Land") [ISO 3166-1]            | True     | 1        | String         | False             | "DE"                   |
| BT-56              | Buyer contact point ("Ansprechpartner")             | False    | 0..1     | String         | False             |                        |
| BT-57              | Buyer contact telephone number ("Telefonnummer")    | False    | 0..1     | Number         | False             |                        |
| BT-58              | Buyer contact email address ("E-Mail-Adress")       | False    | 0..1     | String/ Email  | False             |                        |
| BT-84              | Payment account identifier ("IBAN")                 | True     | 1        | String/ IBAN   | False             |                        |
| BT-85              | Payment account name ("Kontoinhaber")               | False    | 0..1     | String         | False             |                        |
| BT-86              | Payment service provider identifier ("BIC")         | False    | 0..1     | String         | False             |                        |
| BT-109             | Invoice total amount without VAT ("Summe (netto)")  | True     | 1        | Number         | True              |                        |
| BT-110             | Invoice total VAT amount  ("Summe Umsatzsteuer")    | False    | 0..1     | Number         | True              |                        |
| BT-112             | Invoice total amount with VAT ("Summe (brutto)")    | True     | 1        | Number         | True              |                        |
| BT-113             | Paid amount ("Bereits gezahlter Betrag")            | False    | 0..1     | Number         | False             |                        |
| BT-114             | Rounding amount ("Rundungsbetrag")                  | False    | 0..1     | Number         | True but editable |                        |
| BT-115             | Amount due for payment ("Fälliger Rechnungsbetrag") | True     | 1        | Number         | True              |                        |

**Repeatable Groups:**

1. Invoice items ("Positionen")

| Standard Reference | Title                                   | Required | Quantity | Type       | Calculated | Default |
| ------------------ | --------------------------------------- | -------- | -------- | ---------- | ---------- | ------- |
| BT-129             | Invoiced quantity ("Menge")             | True     | 1        | Number     | False      |         |
| BT-131             | Invoice line net amount ("Nettopreis")  | True     | 1        | Number     | False      |         |
| BT-146             | Item net price ("Preis pro Einheit")    | True     | 1        | Number     | False      |         |
| BT-152             | Invoiced item VAT rate ("Umsatzsteuer") | False    | 0..1     | Percentage | False      |         |
| BT-153             | Item name ("Bezeichnung")               | True     | 1        | String     | False      |         |
| BT-154             | Item description ("Beschreibung")       | False    | 0..1     | String     | False      |         |



2. Tax breakdowns ("Steueraufschlüsselungen") for each invoice item

| Standard Reference | Title                                          | Required | Quantity | Type       | Calculated | Default |
| ------------------ | ---------------------------------------------- | -------- | -------- | ---------- | ---------- | ------- |
| BT-116             | VAT category taxable amount ("Summe netto")    | True     | 1        | Number     | True       |         |
| BT-117             | VAT category tax amount ("Umsatzsteuerbetrag") | True     | 1        | Number     | True       |         |
| BT-118             | VAT category code ("Umsatzsteuerkategorie")    | True     | 1        | String     | False      | "S"     |
| BT-119             | VAT category rate ("Umsatzsteuersatz")         | True     | 1        | Percentage | False      |         |

**BT-118:** *• "S" (Standard rate) • "Z" (Zero rated goods) • "E" (Exempt from tax) • "AE" (VAT Reverse Charge) • "K" (VAT exempt for EEA intra-community supply of goods and services) • "G" (Free export item, tax not charged) • "O" (Services outside scope of tax) • "L" (Canary Islands general indirect tax) • "M" (Tax for production, services and importation in Ceuta and Melilla)*



3. Attachments ("Anlagen")





*Numbers which represent a monetary sum must have two decimal places.*


### Technical requirements



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

