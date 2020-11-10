import { Invoice } from '../types';
import XInvoice from '../XInvoice';

describe('XInvoice test suite', () => {
  const xmlString = `<ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2.xsd">
<cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xoev-de:kosit:standard:xrechnung_1.2</cbc:CustomizationID>
<cbc:ID>RENr_Muster001</cbc:ID>
<cbc:IssueDate>2020-08-31</cbc:IssueDate>
<cbc:DueDate>2020-09-04</cbc:DueDate>
<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
<cbc:Note>keine</cbc:Note>
<cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
<cbc:BuyerReference>991-01514-71</cbc:BuyerReference>
<cac:InvoicePeriod>
<cbc:StartDate>2020-07-14</cbc:StartDate>
<cbc:EndDate>2020-08-15</cbc:EndDate>
</cac:InvoicePeriod>
<cac:OrderReference>
<cbc:ID>41876654</cbc:ID>
</cac:OrderReference>
<cac:AccountingSupplierParty>
<cac:Party>
<cac:PartyIdentification>
<cbc:ID>0000123456</cbc:ID>
</cac:PartyIdentification>
<cac:PartyName>
<cbc:Name>test</cbc:Name>
</cac:PartyName>
<cac:PostalAddress>
<cbc:StreetName>Park Tauberfranken 9</cbc:StreetName>
<cbc:CityName>Lauda-Königshofen</cbc:CityName>
<cbc:PostalZone>97922</cbc:PostalZone>
<cbc:CountrySubentity>Baden-Württemberg</cbc:CountrySubentity>
<cac:Country>
<cbc:IdentificationCode>DE</cbc:IdentificationCode>
</cac:Country>
</cac:PostalAddress>
<cac:PartyTaxScheme>
<cbc:CompanyID>DE123456789</cbc:CompanyID>
<cac:TaxScheme>
<cbc:ID>AAA</cbc:ID>
</cac:TaxScheme>
</cac:PartyTaxScheme>
<cac:PartyLegalEntity>
<cbc:RegistrationName>Testersteller XRE Rail GmbH</cbc:RegistrationName>
</cac:PartyLegalEntity>
<cac:Contact>
<cbc:Name>Tina Tester</cbc:Name>
<cbc:Telephone>01736363882</cbc:Telephone>
<cbc:ElectronicMail>danitram@web.de</cbc:ElectronicMail>
</cac:Contact>
</cac:Party>
</cac:AccountingSupplierParty>
<cac:AccountingCustomerParty>
<cac:Party>
<cac:PostalAddress>
<cbc:StreetName>Theodor-Heuss-Allee / 7</cbc:StreetName>
<cbc:CityName>Frankfurt am Main</cbc:CityName>
<cbc:PostalZone>60486</cbc:PostalZone>
<cbc:CountrySubentity>Hessen</cbc:CountrySubentity>
<cac:Country>
<cbc:IdentificationCode>DE</cbc:IdentificationCode>
</cac:Country>
</cac:PostalAddress>
<cac:PartyTaxScheme>
<cbc:CompanyID>DE199861757</cbc:CompanyID>
<cac:TaxScheme>
<cbc:ID>VAT</cbc:ID>
</cac:TaxScheme>
</cac:PartyTaxScheme>
<cac:PartyLegalEntity>
<cbc:RegistrationName>DB Netz AG</cbc:RegistrationName>
</cac:PartyLegalEntity>
</cac:Party>
</cac:AccountingCustomerParty>
<cac:PaymentMeans>
<cbc:PaymentMeansCode>30</cbc:PaymentMeansCode>
<cbc:PaymentID>Rechnung mit Bitte um Bezahlung</cbc:PaymentID>
<cac:PayeeFinancialAccount>
<cbc:ID>DE12345678912345678900</cbc:ID>
<cbc:Name>Testersteller XRE Rail GmbH</cbc:Name>
<cac:FinancialInstitutionBranch>
<cbc:ID>DEUXXXXXXXX</cbc:ID>
</cac:FinancialInstitutionBranch>
</cac:PayeeFinancialAccount>
</cac:PaymentMeans>
<cac:PaymentTerms>
<cbc:Note>keine</cbc:Note>
</cac:PaymentTerms>
<cac:TaxTotal>
<cbc:TaxAmount currencyID="EUR">475.00</cbc:TaxAmount>
<cac:TaxSubtotal>
<cbc:TaxableAmount currencyID="EUR">2500.00</cbc:TaxableAmount>
<cbc:TaxAmount currencyID="EUR">475.00</cbc:TaxAmount>
<cac:TaxCategory>
<cbc:ID>S</cbc:ID>
<cbc:Percent>19</cbc:Percent>
<cac:TaxScheme>
<cbc:ID>VAT</cbc:ID>
</cac:TaxScheme>
</cac:TaxCategory>
</cac:TaxSubtotal>
</cac:TaxTotal>
<cac:LegalMonetaryTotal>
<cbc:LineExtensionAmount currencyID="EUR">2500.00</cbc:LineExtensionAmount>
<cbc:TaxExclusiveAmount currencyID="EUR">2500.00</cbc:TaxExclusiveAmount>
<cbc:TaxInclusiveAmount currencyID="EUR">2975.00</cbc:TaxInclusiveAmount>
<cbc:PayableAmount currencyID="EUR">2975.00</cbc:PayableAmount>
</cac:LegalMonetaryTotal>
<cac:InvoiceLine>
<cbc:ID>10</cbc:ID>
<cbc:InvoicedQuantity unitCode="C62">1</cbc:InvoicedQuantity>
<cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
<cac:Item>
<cbc:Name>XRE TEST RE Muster</cbc:Name>
<cac:SellersItemIdentification>
<cbc:ID>4711</cbc:ID>
</cac:SellersItemIdentification>
<cac:ClassifiedTaxCategory>
<cbc:ID>S</cbc:ID>
<cbc:Percent>19</cbc:Percent>
<cac:TaxScheme>
<cbc:ID>VAT</cbc:ID>
</cac:TaxScheme>
</cac:ClassifiedTaxCategory>
</cac:Item>
<cac:Price>
<cbc:PriceAmount currencyID="EUR">1000</cbc:PriceAmount>
</cac:Price>
</cac:InvoiceLine><cac:InvoiceLine>
<cbc:ID>20</cbc:ID>
<cbc:InvoicedQuantity unitCode="C62">1</cbc:InvoicedQuantity>
<cbc:LineExtensionAmount currencyID="EUR">1500.00</cbc:LineExtensionAmount>
<cac:Item>
<cbc:Name>XRE TEST RE Muster</cbc:Name>
<cac:SellersItemIdentification>
<cbc:ID>4712</cbc:ID>
</cac:SellersItemIdentification>
<cac:ClassifiedTaxCategory>
<cbc:ID>S</cbc:ID>
<cbc:Percent>19</cbc:Percent>
<cac:TaxScheme>
<cbc:ID>VAT</cbc:ID>
</cac:TaxScheme>
</cac:ClassifiedTaxCategory>
</cac:Item>
<cac:Price>
<cbc:PriceAmount currencyID="EUR">1500</cbc:PriceAmount>
</cac:Price>
</cac:InvoiceLine>
</ubl:Invoice>`;
  const xinvoice: Invoice = {
    CustomizationID:
      'urn:cen.eu:en16931:2017#compliant#urn:xoev-de:kosit:standard:xrechnung_1.2',
    ID: 'RENr_Muster001',
    IssueDate: '2020-08-31',
    DueDate: '2020-09-04',
    InvoiceTypeCode: '380',
    Note: 'keine',
    DocumentCurrencyCode: 'EUR',
    BuyerReference: '991-01514-71',
    InvoicePeriod: { StartDate: '2020-07-14', EndDate: '2020-08-15' },
    OrderReference: { ID: '41876654' },
    AccountingSupplierParty: {
      Party: {
        PartyIdentification: { ID: '0000123456' },
        PartyName: { Name: 'test' },
        PostalAddress: {
          StreetName: 'Park Tauberfranken 9',
          CityName: 'Lauda-Königshofen',
          PostalZone: '97922',
          CountrySubentity: 'Baden-Württemberg',
          Country: { IdentificationCode: 'DE' },
        },
        PartyTaxScheme: { CompanyID: 'DE123456789', TaxScheme: { ID: 'AAA' } },
        PartyLegalEntity: { RegistrationName: 'Testersteller XRE Rail GmbH' },
        Contact: {
          Name: 'Tina Tester',
          Telephone: '01736363882',
          ElectronicMail: 'danitram@web.de',
        },
      },
    },
    AccountingCustomerParty: {
      Party: {
        PostalAddress: {
          StreetName: 'Theodor-Heuss-Allee / 7',
          CityName: 'Frankfurt am Main',
          PostalZone: '60486',
          CountrySubentity: 'Hessen',
          Country: { IdentificationCode: 'DE' },
        },
        PartyTaxScheme: { CompanyID: 'DE199861757', TaxScheme: { ID: 'VAT' } },
        PartyLegalEntity: { RegistrationName: 'DB Netz AG' },
      },
    },
    PaymentMeans: {
      PaymentMeansCode: '30',
      PaymentID: 'Rechnung mit Bitte um Bezahlung',
      PayeeFinancialAccount: {
        ID: 'DE12345678912345678900',
        Name: 'Testersteller XRE Rail GmbH',
        FinancialInstitutionBranch: { ID: 'DEUXXXXXXXX' },
      },
    },
    PaymentTerms: { Note: 'keine' },
    TaxTotal: {
      TaxAmount: { content: '475.00', attributes: { currencyID: 'EUR' } },
      TaxSubtotal: {
        TaxableAmount: {
          content: '2500.00',
          attributes: { currencyID: 'EUR' },
        },
        TaxAmount: { content: '475.00', attributes: { currencyID: 'EUR' } },
        TaxCategory: { ID: 'S', Percent: '19', TaxScheme: { ID: 'VAT' } },
      },
    },
    LegalMonetaryTotal: {
      LineExtensionAmount: {
        content: '2500.00',
        attributes: { currencyID: 'EUR' },
      },
      TaxExclusiveAmount: {
        content: '2500.00',
        attributes: { currencyID: 'EUR' },
      },
      TaxInclusiveAmount: {
        content: '2975.00',
        attributes: { currencyID: 'EUR' },
      },
      PayableAmount: { content: '2975.00', attributes: { currencyID: 'EUR' } },
    },
    InvoiceLine: [
      {
        ID: '10',
        InvoicedQuantity: { content: '1', attributes: { unitCode: 'C62' } },
        LineExtensionAmount: {
          content: '1000.00',
          attributes: { currencyID: 'EUR' },
        },
        Item: {
          Name: 'XRE TEST RE Muster',
          SellersItemIdentification: { ID: '4711' },
          ClassifiedTaxCategory: {
            ID: 'S',
            Percent: '19',
            TaxScheme: { ID: 'VAT' },
          },
        },
        Price: {
          PriceAmount: { content: '1000', attributes: { currencyID: 'EUR' } },
        },
      },
      {
        ID: '20',
        InvoicedQuantity: { content: '1', attributes: { unitCode: 'C62' } },
        LineExtensionAmount: {
          content: '1500.00',
          attributes: { currencyID: 'EUR' },
        },
        Item: {
          Name: 'XRE TEST RE Muster',
          SellersItemIdentification: { ID: '4712' },
          ClassifiedTaxCategory: {
            ID: 'S',
            Percent: '19',
            TaxScheme: { ID: 'VAT' },
          },
        },
        Price: {
          PriceAmount: { content: '1500', attributes: { currencyID: 'EUR' } },
        },
      },
    ],
  };

  it('should generate a valid xml string from an x invoice (simple snapshot test.)', () => {
    expect(new XInvoice(xinvoice).toXML()).toEqual(xmlString);
  });
  it('should generate an XInvoice object from a XML string', async () => {
    expect(await XInvoice.fromXML(xmlString)).toEqual(xinvoice);
  });
  it('should close the circle (it already did though)', async () => {
    expect(
      new XInvoice((await XInvoice.fromXML(xmlString)) as Invoice).toXML()
    ).toEqual(xmlString);
  });
  it('should validate a xml string by using the schematron definitions from itplr', async () => {
    expect(
      await XInvoice.validateXInvoice(new XInvoice(xinvoice).toXML())
    ).toBeTruthy();
    expect(await XInvoice.validateXInvoice(xmlString)).toBeTruthy();
  });
});
