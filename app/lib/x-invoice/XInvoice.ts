import XInvoiceEnumTag from './XInvoiceEnumTag';
import XInvoiceStringTag from './XInvoiceStringTag';
import XInvoiceNumberTag from './XInvoiceNumberTag';
import XInvoiceDateTag from './XInvoiceDateTag';

export interface TagWithAttributes {
  attributes?: Record<string, string>[];
  content: string;
}

export interface InvoicePeriod {
  StartDate: XInvoiceDateTag;
  EndDate: XInvoiceDateTag;
  DescriptionCode: XInvoiceEnumTag<VATDateCode>;
}

export interface OrderReference {
  ID: XInvoiceStringTag;
  SalesOrderID: XInvoiceStringTag;
}

export interface BillingReference {
  InvoiceDocumentReference: InvoiceDocumentReference;
}

export interface InvoiceDocumentReference {
  ID: XInvoiceStringTag;
  IssueDate: XInvoiceDateTag;
}

export interface DespatchDocumentReference {
  ID: XInvoiceStringTag;
}

export interface ReceiptDocumentReference {
  ID: XInvoiceStringTag;
}

export interface OriginatorDocumentReference {
  ID: XInvoiceStringTag;
}

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

export enum CurrencyCodes {
  EUR,
}

export enum VATDateCode {
  '3', // Invoice document issue date time
  '35', // Delivery date/time, actual
  '432', // Paid to date
}

export enum TaxCurrencyCode {}

export interface XInvoice {
  CustomizationID: XInvoiceStringTag;
  ProfileId: XInvoiceStringTag;
  ID: XInvoiceNumberTag;
  IssueDate: XInvoiceDateTag;
  DueDate?: XInvoiceDateTag;
  InvoiceTypeCode: 380;
  Note?: XInvoiceStringTag;
  TaxPointDate?: XInvoiceDateTag;
  DocumentCurrencyCode: XInvoiceEnumTag<CurrencyCodes>;
  TaxCurrencyCode?: XInvoiceEnumTag<TaxCurrencyCode>;
  AccountingCost?: XInvoiceStringTag;
  BuyerReference?: XInvoiceStringTag;
  InvoicePeriod?: InvoicePeriod;
  BillingsReference?: BillingReference[];
  TaxTotal: TaxTotal | [TaxTotal, TaxTotal];
}
