export interface TagWithAttributes {
  attributes?: Record<string, string>[];
  content: string;
}

export interface InvoicePeriod {}

export interface OrderReference {}

export interface BillingReference {}

export interface DespatchDocumentReference {}

export interface ReceiptDocumentReference {}

export interface OriginatorDocumentReference {}

export interface ContractDocumentReference {}

export interface AdditionalDocumentReference {}

export interface ProjectReference {}

export interface AccountingSupplierParty {}
export interface AccountingCustomerParty {}
export interface PayeeParty {}

export interface TaxRepresentativeParty {}
export interface Delivery {}
export interface PaymentMeans {}
export interface PaymentTerms {}
export interface AllowanceCharge {}
export interface TaxTotal {}
export interface LegalMonetaryTotal {}
export interface InvoiceLine {}

export interface XInvoice {
  CustomizationID: string;
  ProfileId: string;
  ID: string;
  IssueDate: string;
  DueDate?: string;
  InvoiceTypeCode: string;
  Note?: string;
  TaxPointDate?: string;
  DocumentCurrencyCode: string;
  TaxCurrencyCode?: string;
  AccountingCost?: string;
  BuyerReference?: string;
}
