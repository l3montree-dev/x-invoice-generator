export default class DefaultValueProvider {
  static root = {
    InvoiceTypeCode: '380',
    'TaxTotal.TaxAmount@currencyID': 'EUR',
    'LegalMonetaryTotal.LineExtensionAmount@currencyID': 'EUR',
    'LegalMonetaryTotal.TaxExclusiveAmount@currencyID': 'EUR',
    'LegalMonetaryTotal.TaxInclusiveAmount@currencyID': 'EUR',
    'LegalMonetaryTotal.PayableAmount@currencyID': 'EUR',
  };

  static invoiceLine = {
    'Item.ClassifiedTaxCategory.ID': 'S',
    'Price.PriceAmount@currencyID': 'EUR',
    'Item.ClassifiedTaxCategory.TaxScheme.ID': 'VAT',
  };
}
