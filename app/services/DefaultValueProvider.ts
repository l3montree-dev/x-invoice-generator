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
        'Price.PriceAmount@currencyID': 'EUR',
        'Item.ClassifiedTaxCategory.TaxScheme.ID': 'VAT',
    };
}
