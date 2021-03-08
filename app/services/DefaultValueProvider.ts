export default class DefaultValueProvider {
    static orderLookupTable: {[str: string]: number} = {
        CustomizationID: 0,
        ID: 5,
        IssueDate: 20,
        InvoiceTypeCode: 30,
        DocumentCurrencyCode: 40,
        BuyerReference: 50,
        AccountingSupplierParty: 60,
        AccountingCustomerParty: 70,
        PaymentMeans: 80,
        PaymentTerms: 90,
        TaxTotal: 100,
        LegalMonetaryTotal: 110,
        InvoiceLine: 120,

        // AccountingSupplierParty / AccountingCustomerParty
        Party: 0,

        // Party
        PostalAddress: 0,
        PartyTaxScheme: 10,
        PartyLegalEntity: 20,
        Contact: 30,

        // PostalAddress
        StreetName: 0,
        AdditionalStreetName: 10,
        CityName: 20,
        PostalZone: 30,
        Country: 40,

        // PartyTaxScheme
        CompanyID: 5,
        TaxScheme: 7,

        // PartyLegalEntity
        RegistrationName: 0,

        // Contact
        Name: 0,
        Telephone: 10,
        ElectronicMail: 20,

        // Country
        IdentificationCode: 0,

        // PaymentMeans
        PaymentMeansCode: 0,
        PaymentID: 10,
        PayeeFinancialAccount: 20,

        // TaxTotal
        TaxAmount: 5,
        TaxSubtotal: 10,

        // TaxSubtotal
        TaxableAmount: 0,
        TaxCategory: 10,

        // TaxCategory
        Percent: 6,

        // LegalMonetaryTotal
        LineExtensionAmount: 7,
        TaxExclusiveAmount: 10,
        TaxInclusiveAmount: 20,
        PayableAmount: 30,

        // InvoiceLine
        InvoicedQuantity: 6,
        InvoicePeriod: 10,
        OrderLineReference: 20,
        Item: 30,
        Price: 40,

        // InvoicePeriod
        StartDate: 0,
        EndDate: 10,

        // OrderLineReference
        LineID: 0,

        // Item
        SellersItemIdentification: 10,
        ClassifiedTaxCategory: 20,

        // Price
        PriceAmount: 0,
    }
    static root = {
        InvoiceTypeCode: '380',
        DocumentCurrencyCode: "EUR",
        'TaxTotal.TaxAmount@currencyID': 'EUR',
        'LegalMonetaryTotal.LineExtensionAmount@currencyID': 'EUR',
        'LegalMonetaryTotal.TaxExclusiveAmount@currencyID': 'EUR',
        'LegalMonetaryTotal.TaxInclusiveAmount@currencyID': 'EUR',
        'LegalMonetaryTotal.PayableAmount@currencyID': 'EUR',
        'AccountingSupplierParty.TaxScheme.ID': "",
        'AccountingCustomerParty.TaxScheme.ID': "",
    };

    static invoiceLine = {
        'Price.PriceAmount@currencyID': 'EUR',
        'Item.ClassifiedTaxCategory.TaxScheme.ID': 'VAT',
    };
}
