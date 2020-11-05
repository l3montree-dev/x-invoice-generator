import { CurrencyCodes, Invoice, Party } from '../types';
import XInvoice from '../XInvoice';

describe('XInvoice test suite', () => {
  const xmlString = `<ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2.xsd"><cac:AccountingCustomerParty><cac:Party><cbc:EndpointID schemeID="scheme_id">endpoint_id</cbc:EndpointID>
<cac:PartyLegalEntity><cbc:RegistrationName>registration_name</cbc:RegistrationName></cac:PartyLegalEntity>
<cac:PostalAddress><cac:Country><cbc:IdentificationCode>CN</cbc:IdentificationCode></cac:Country></cac:PostalAddress></cac:Party></cac:AccountingCustomerParty>
<cac:AccountingSupplierParty><cac:Party><cbc:EndpointID schemeID="scheme_id">endpoint_id</cbc:EndpointID>
<cac:PartyLegalEntity><cbc:RegistrationName>registration_name</cbc:RegistrationName></cac:PartyLegalEntity>
<cac:PostalAddress><cac:Country><cbc:IdentificationCode>CN</cbc:IdentificationCode></cac:Country></cac:PostalAddress></cac:Party></cac:AccountingSupplierParty>
<cbc:CustomizationID>customization_id</cbc:CustomizationID>
<cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>
<cbc:ID>1</cbc:ID>
<cac:InvoiceLine><cbc:ID>abc123</cbc:ID>
<cbc:InvoicedQuantity unitCode="CN">2</cbc:InvoicedQuantity>
<cbc:LineExtensionAmount currencyID="EUR">2</cbc:LineExtensionAmount>
<cac:Item><cbc:Name>item</cbc:Name>
<cac:ClassifiedTaxCategory><cbc:ID>abc</cbc:ID>
<cac:TaxScheme><cbc:ID>abc</cbc:ID></cac:TaxScheme></cac:ClassifiedTaxCategory></cac:Item>
<cac:Price><cbc:PriceAmount currencyID="EUR">2</cbc:PriceAmount></cac:Price></cac:InvoiceLine><cac:InvoiceLine><cbc:ID>abc1234</cbc:ID>
<cbc:InvoicedQuantity unitCode="CN">2</cbc:InvoicedQuantity>
<cbc:LineExtensionAmount currencyID="EUR">2</cbc:LineExtensionAmount>
<cac:Item><cbc:Name>item</cbc:Name>
<cac:ClassifiedTaxCategory><cbc:ID>abc</cbc:ID>
<cac:TaxScheme><cbc:ID>abc</cbc:ID></cac:TaxScheme></cac:ClassifiedTaxCategory></cac:Item>
<cac:Price><cbc:PriceAmount currencyID="EUR">2</cbc:PriceAmount></cac:Price></cac:InvoiceLine>
<cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
<cbc:IssueDate>2020-11-02</cbc:IssueDate>
<cac:LegalMonetaryTotal><cbc:TaxInclusiveAmount currencyID="EUR">10</cbc:TaxInclusiveAmount>
<cbc:TaxExclusiveAmount currencyID="EUR">0</cbc:TaxExclusiveAmount>
<cbc:LineExtensionAmount currencyID="EUR">0</cbc:LineExtensionAmount></cac:LegalMonetaryTotal>
<cbc:ProfileId>profile_id</cbc:ProfileId>
<cac:TaxTotal><cbc:TaxAmount currencyID="EUR">2</cbc:TaxAmount></cac:TaxTotal></ubl:Invoice>`;
  const party: Party = {
    EndpointID: {
      content: 'endpoint_id',
      attributes: { schemeID: 'scheme_id' },
    },
    PartyLegalEntity: {
      RegistrationName: 'registration_name',
    },
    PostalAddress: {
      Country: {
        IdentificationCode: 'CN',
      },
    },
  };
  const xinvoice: Invoice = {
    AccountingCustomerParty: {
      Party: party,
    },
    AccountingSupplierParty: {
      Party: party,
    },
    CustomizationID: 'customization_id',
    DocumentCurrencyCode: 'EUR',
    ID: '1',
    InvoiceLine: [
      {
        ID: 'abc123',
        InvoicedQuantity: { attributes: { unitCode: 'CN' }, content: '2' },
        LineExtensionAmount: {
          attributes: { currencyID: CurrencyCodes.EUR },
          content: '2',
        },
        Item: {
          Name: 'item',
          ClassifiedTaxCategory: {
            ID: 'abc',
            TaxScheme: {
              ID: 'abc',
            },
          },
        },
        Price: {
          PriceAmount: {
            attributes: { currencyID: CurrencyCodes.EUR },
            content: '2',
          },
        },
      },
      {
        ID: 'abc1234',
        InvoicedQuantity: { attributes: { unitCode: 'CN' }, content: '2' },
        LineExtensionAmount: {
          attributes: { currencyID: CurrencyCodes.EUR },
          content: '2',
        },
        Item: {
          Name: 'item',
          ClassifiedTaxCategory: {
            ID: 'abc',
            TaxScheme: {
              ID: 'abc',
            },
          },
        },
        Price: {
          PriceAmount: {
            attributes: { currencyID: CurrencyCodes.EUR },
            content: '2',
          },
        },
      },
    ],
    InvoiceTypeCode: '380',
    IssueDate: '2020-11-02',
    LegalMonetaryTotal: {
      TaxInclusiveAmount: {
        content: '10',
        attributes: { currencyID: CurrencyCodes.EUR },
      },
      TaxExclusiveAmount: {
        content: '0',
        attributes: { currencyID: CurrencyCodes.EUR },
      },
      LineExtensionAmount: {
        content: '0',
        attributes: { currencyID: CurrencyCodes.EUR },
      },
    },
    ProfileId: 'profile_id',
    TaxTotal: {
      TaxAmount: {
        content: '2',
        attributes: { currencyID: CurrencyCodes.EUR },
      },
    },
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
});
