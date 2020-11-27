<div align="center">
<a href="https://l3montree.com"><img align="center" width="150" src=https://l3montree.com/_next/image?url=https%3A%2F%2Fcms.l3montree.com%2Fuploads%2FX_Invoice_Logo_abc7b64e24.svg&w=48&q=75 /></a>
<div align="left">

# X-Invoice-Generator

Willkommen! In diesem Projekt soll ein offener, kostenloser und freier Generator für X-Rechnungen entwickelt werden. Es wird versucht, die Spezifikationen des X-Rechnungsstandards (Beschluss des IT-Planungsrates vom 22. Juni 2017, Richtlinie 2014/55/EU in Deutschland) auf einfache und offene Weise umzusetzen.

Als Hauptreferenz wird der Standard in Version 2.0.0 (30.06.2020) genutzt. Eine Version des Dokuments kann [hier](https://www.xoev.de/sixcms/media.php/13/200-XRechnung-2020-06-30.pdf) heruntergeladen werden.

Die im Projekt verwendete Syntax ist die UBL (Universal Business Language) - Syntax. Eine Dokumentation dieser kann [hier](https://docs.peppol.eu/poacc/billing/3.0/syntax/ubl-invoice/tree/) bei der PEPPOL eingesehen werden.

Dieses Projekt wurde von der [Neuland@Homeland GmbH](https://neuland-homeland.de) initiiert, von [l3montree](https://l3montree.com) bisher entwickelt und steht offen für Beiträge von jedem.

## Herunterladen und installieren

Auf der [Release Seite](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/releases) dieses Projektes können Installationsdateien für Windows (64-bit exe), Linux (amd64, Debian) und OS X (dmg) heruntergeladen werden.

## Table of content:

1. Start & Entwickeln
2. Etwas über das Projekt
3. Beispiel X-Rechnungen
4. Sonstiges

### Start & Entwickeln

1. Clone des Projektes.
2. In den Projekt Unterordner navigieren.
3. `npm install` ausführen.
4. Um die Anwendung im Entwicklermodus zu starten: `npm run dev`

Weitere Informationen gibt es in der `package.json`.

### Etwas über das Projekt

Das Projekt wurde so aufgebaut, dass es möglichst einfach ist Anpassungen für spezifische Anforderungen umzusetzen. So wurde die aktuelle Version [v0.0.1](https://gitlab.com/l3montree/x-invoice/x-invoice-generator/-/releases) vor allem dafür entworfen Rechnungen entsprechend den Anforderungen ([Wiki](<https://gitlab.com/l3montree/x-invoice-generator/-/wikis/documentation/specific_requirements_XInvoice/Deutsche_Bahn/Deutsche_Bahn_XInvoice_Requirements_(UBL)>)) der **Deutschen Bahn** zu generieren. Hinweise der Deutschen Bahn zu dem Thema X-Rechnung können [hier](https://www.deutschebahn.com/de/geschaefte/lieferantenportal/informationsservice/FAQs-rund-um-das-Thema-Rechnungsstellung-5570102) eingesehen werden.

### Beispiel X-Rechnungen

Beispiele für X-Rechnungen in UBL und CII Syntax können [hier](https://basket.l3montree.com/s/BwpsnCQRTfiRckW) heruntergeladen werden.

### Credits

Das Projekt wurde auf Basis der [Electron React Boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) aufgesetzt.

## Lizenz

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
