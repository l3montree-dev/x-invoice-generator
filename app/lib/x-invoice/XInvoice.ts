import XInvoiceEnumTag from './XInvoiceEnumTag';
import XInvoiceStringTag from './XInvoiceStringTag';
import XInvoiceNumberTag from './XInvoiceNumberTag';
import XInvoiceDateTag from './XInvoiceDateTag';
import XInvoiceTag from './XInvoiceTag';

export interface InvoicePeriod {
  StartDate?: XInvoiceDateTag;
  EndDate?: XInvoiceDateTag;
  DescriptionCode?: XInvoiceEnumTag<
    | '3' // Invoice document issue date time
    | '35' // Delivery date/time, actual
    | '432' // Paid to date>
  >;
}

export interface OrderReference extends Identification<XInvoiceStringTag> {
  SalesOrderID?: XInvoiceStringTag;
}

export interface BillingReference {
  InvoiceDocumentReference: InvoiceDocumentReference;
}

export interface InvoiceDocumentReference
  extends Identification<XInvoiceNumberTag> {
  IssueDate?: XInvoiceDateTag;
}

export type DespatchDocumentReference = Identification<XInvoiceStringTag>;

export type ReceiptDocumentReference = Identification<XInvoiceStringTag>;

export type OriginatorDocumentReference = Identification<XInvoiceStringTag>;

export type ContractDocumentReference = Identification<XInvoiceStringTag>;

export interface AdditionalDocumentReference {}

export interface ProjectReference {}

export interface AccountingSupplierParty {}
export interface AccountingCustomerParty {}
export interface PayeeParty {}

export interface TaxRepresentativeParty {}
export interface Delivery {}
export interface PaymentMeans {}
export interface PaymentTerms {}
export interface TaxCategory extends Identification<XInvoiceNumberTag> {
  Percent?: XInvoiceNumberTag;
  TaxExemptionReasonCode?: XInvoiceNumberTag;
  TaxExemptionReason?: XInvoiceStringTag;
  TaxScheme: TaxScheme;
}
export interface TaxSubtotal {
  TaxableAmount: XInvoiceNumberTag;
  TaxAmount: XInvoiceNumberTag;
  TaxCategory: TaxCategory;
}
export interface TaxTotal {
  TaxAmount: XInvoiceNumberTag;
  TaxSubtotal?: TaxSubtotal[];
}
export interface LegalMonetaryTotal {
  LineExtensionAmount: XInvoiceNumberTag;
  TaxExclusiveAmount: XInvoiceNumberTag;
  TaxInclusiveAmount: XInvoiceNumberTag;
  AllowanceTotalAmount?: XInvoiceNumberTag;
  ChargeTotalAmount?: XInvoiceNumberTag;
  PrepaidAmount?: XInvoiceNumberTag;
  PayableRoundingAmount?: XInvoiceNumberTag;
  PayableAmount?: XInvoiceNumberTag;
}
export interface OrderLineReference {
  LineId: XInvoiceNumberTag;
}

export interface DocumentReference extends Identification<XInvoiceStringTag> {
  DocumentTypeCode: 130;
}
export enum Bool {
  true,
  false,
}
export interface Identification<T extends XInvoiceTag<any>> {
  ID: T;
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
export interface ClassifiedTaxCategory
  extends Identification<XInvoiceNumberTag> {
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
  BuyersItemIdentification?: Identification<XInvoiceNumberTag>;
  SellersItemIdentification?: Identification<XInvoiceNumberTag>;
  StandardItemIdentification?: Identification<XInvoiceNumberTag>;
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
  LegalMonetaryTotal: LegalMonetaryTotal;
}
