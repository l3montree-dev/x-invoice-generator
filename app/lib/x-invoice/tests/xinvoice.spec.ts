import { CurrencyCodes, IdentificationCode, Invoice, Party } from '../types';
import XInvoiceNumberTag from '../XInvoiceNumberTag';
import XInvoiceDateTag from '../XInvoiceDateTag';
import XInvoiceStringTag from '../XInvoiceStringTag';
import XInvoiceEnumTag from '../XInvoiceEnumTag';
import XInvoice from '../XInvoice';

describe('XInvoice test suite', () => {
  const party: Party = {
    EndpointID: new XInvoiceStringTag<{ schemeID: 'scheme_id' }>('endpoint_id'),
    PartyLegalEntity: {
      RegistrationName: new XInvoiceStringTag('registration_name'),
    },
    PostalAddress: {
      Country: {
        IdentificationCode: new XInvoiceEnumTag<IdentificationCode>(
          IdentificationCode.CN
        ),
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
    CustomizationID: new XInvoiceStringTag('customization_id'),
    DocumentCurrencyCode: new XInvoiceEnumTag<CurrencyCodes>(CurrencyCodes.EUR),
    ID: new XInvoiceNumberTag(1),
    InvoiceLine: [],
    InvoiceTypeCode: new XInvoiceNumberTag(380),
    IssueDate: new XInvoiceDateTag(new Date()),
    LegalMonetaryTotal: {
      TaxInclusiveAmount: new XInvoiceNumberTag<{ currencyID: CurrencyCodes }>(
        10,
        { attributes: { currencyID: CurrencyCodes.EUR } }
      ),
      TaxExclusiveAmount: new XInvoiceNumberTag<{ currencyID: CurrencyCodes }>(
        0,
        { attributes: { currencyID: CurrencyCodes.EUR } }
      ),
      LineExtensionAmount: new XInvoiceNumberTag<{ currencyID: CurrencyCodes }>(
        0,
        { attributes: { currencyID: CurrencyCodes.EUR } }
      ),
    },
    ProfileId: new XInvoiceStringTag('abc'),
    TaxTotal: {
      TaxAmount: new XInvoiceNumberTag<{ currencyID: CurrencyCodes }>(2, {
        attributes: { currencyID: CurrencyCodes.EUR },
      }),
    },
  };

  it('should generate a valid xml string from an x invoice', () => {
    console.log(new XInvoice(xinvoice).toXML());
  });
});
