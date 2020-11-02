import XInvoiceEnumTag from './XInvoiceEnumTag';
import XInvoiceStringTag from './XInvoiceStringTag';
import XInvoiceNumberTag from './XInvoiceNumberTag';
import XInvoiceDateTag from './XInvoiceDateTag';

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

export enum CurrencyCodes {
  EUR,
}

export enum TaxCurrencyCode {}

export interface XInvoice {
  CustomizationID: XInvoiceStringTag;
  ProfileId: XInvoiceStringTag;
  ID: XInvoiceNumberTag;
  IssueDate: XInvoiceDateTag;
  DueDate?: XInvoiceDateTag;
  InvoiceTypeCode: XInvoiceEnumTag<'380' | '383'>;
  Note?: XInvoiceStringTag;
  TaxPointDate?: XInvoiceDateTag;
  DocumentCurrencyCode: XInvoiceEnumTag<CurrencyCodes>;
  TaxCurrencyCode?: XInvoiceEnumTag<TaxCurrencyCode>;
  AccountingCost?: XInvoiceStringTag;
  BuyerReference?: XInvoiceStringTag;
  InvoicePeriod: InvoicePeriod;
}
