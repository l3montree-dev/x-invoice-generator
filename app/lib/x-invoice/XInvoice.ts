import XInvoiceEnumTag from './XInvoiceEnumTag';
import XInvoiceStringTag from './XInvoiceStringTag';
import XInvoiceNumberTag from './XInvoiceNumberTag';
import XInvoiceDateTag from './XInvoiceDateTag';
import XInvoiceTag from './XInvoiceTag';

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
export interface InvoicePeriod {
  StartDate: XInvoiceDateTag;
  EndDate: XInvoiceDateTag;
}
export interface OrderLineReference {
  LineId: XInvoiceNumberTag;
}

export interface DocumentReference {
  ID: XInvoiceStringTag;
  DocumentTypeCode: 130;
}
export enum Bool {
  true,
  false,
}
export interface Identification {
  ID: XInvoiceNumberTag;
}
export enum IdentificationCode {
  CN,
}
export interface OriginCountry {
  IdentificationCode: XInvoiceEnumTag<IdentificationCode>;
}
export interface CommodityClassification {
  ItemClassificationCode: XInvoiceNumberTag;
}

export enum TaxSchemeID {
  VAT,
}
export interface TaxScheme {
  ID: XInvoiceEnumTag<TaxSchemeID>;
}
export interface ClassifiedTaxCategory extends Identification {
  Percent?: XInvoiceNumberTag;
  TaxScheme: TaxScheme;
}
export interface AdditionalItemProperty {
  Name: XInvoiceTag<any>;
  Value: XInvoiceTag<any>;
}
export interface Item {
  Description?: XInvoiceStringTag;
  Name: XInvoiceStringTag;
  BuyersItemIdentification?: Identification;
  SellersItemIdentification?: Identification;
  StandardItemIdentification?: Identification;
  OriginCountry?: OriginCountry;
  CommodityClassification?: CommodityClassification;
  ClassifiedTaxCategory: ClassifiedTaxCategory;
  AdditionalItemProperty?: AdditionalItemProperty[];
}
export interface AllowanceCharge {
  ChargeIndicator: XInvoiceEnumTag<Bool>;
  AllowanceChargeReasonCode?: XInvoiceNumberTag;
  AllowanceChargeReason?: XInvoiceStringTag;
  MultiplierFactorNumeric: XInvoiceNumberTag;
  Amount: XInvoiceNumberTag;
  BaseAmount?: XInvoiceNumberTag;
  Item: Item;
}
export interface Price {
  PriceAmount: XInvoiceNumberTag;
  BaseQuantity?: XInvoiceNumberTag;
  AllowanceCharge?: AllowanceCharge;
}
export interface InvoiceLine {
  ID: XInvoiceNumberTag;
  Note?: XInvoiceStringTag;
  InvoicedQuantity: XInvoiceNumberTag;
  LineExtensionAmount: XInvoiceNumberTag;
  AccountingCost?: XInvoiceStringTag;
  InvoicePeriod?: InvoicePeriod;
  OrderLineReference?: OrderLineReference;
  DocumentReference?: DocumentReference;
  AllowanceCharge?: AllowanceCharge;
  Item: Item;
  Price: Price;
}

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
  InvoiceLine: InvoiceLine[];
}
