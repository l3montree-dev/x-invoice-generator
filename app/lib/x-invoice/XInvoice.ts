import XInvoiceEnumTag from './XInvoiceEnumTag';
import XInvoiceStringTag from './XInvoiceStringTag';
import XInvoiceNumberTag from './XInvoiceNumberTag';
import XInvoiceDateTag from './XInvoiceDateTag';
import XInvoiceBinaryObjectTag from './XInvoiceBinaryObjectTag';
import XInvoiceURITag from './XInvoiceURITag';
import XInvoiceTag from './XInvoiceTag';
import XInvoiceEMailTag from './XInvoiceEMailTag';

export interface TagWithAttributes {
  attributes?: Record<string, string>[];
  content: string;
}

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

export interface AdditionalDocumentReference
  extends Identification<XInvoiceStringTag> {
  DocumentTypeCode?: '130';
  DocumentDescription?: XInvoiceStringTag;
  Attachment?: Attachment;
}

export interface Attachment {
  EmbeddedDocumentBinaryObject?: XInvoiceBinaryObjectTag;
  ExternalReference?: ExternalReference;
}

export interface ExternalReference {
  URI: XInvoiceURITag;
}

export type ProjectReference = Identification<XInvoiceStringTag>;

export interface AccountingSupplierParty {
  Party: Party;
}

export interface Party {
  EndpointID: XInvoiceStringTag<{ schemeID: string }>;
  PartyIdentification?: PartyIdentification[];
  PartyName?: PartyName;
  PostalAddress: PostalAddress;
  PartyTaxScheme?: PartyTaxScheme | [PartyTaxScheme, PartyTaxScheme];
  PartyLegalEntity: PartyLegalEntity;
  Contact?: Contact;
}

export interface PartyIdentification {
  ID: XInvoiceStringTag<{ schemeID: string }>;
}

export interface PartyName {
  Name: XInvoiceStringTag;
}

export interface PostalAddress {
  StreetName?: XInvoiceStringTag;
  AdditionalStreetName?: XInvoiceStringTag;
  CityName?: XInvoiceStringTag;
  PostalZone?: XInvoiceStringTag;
  CountrySubentity?: XInvoiceStringTag;
  AddressLine?: AddressLine;
  Country: Country;
}

export interface AddressLine {
  Line: XInvoiceStringTag;
}

export interface Country {
  IdentificationCode: IdentificationCode;
}

export interface PartyTaxScheme {
  CompanyID: XInvoiceStringTag;
  TaxScheme: TaxScheme;
}

export interface PartyLegalEntity {
  RegistrationName: XInvoiceStringTag;
  CompanyID?: XInvoiceStringTag<{ schemeID: string }>;
  ComapnyLegalForm?: XInvoiceStringTag;
}
export interface Contact {
  Name?: XInvoiceStringTag;
  Telephone?: XInvoiceStringTag;
  ElectronicMail?: XInvoiceEMailTag;
}
export interface AccountingCustomerParty {}
export interface PayeeParty {}

export interface TaxRepresentativeParty {}
export interface Delivery {}
export interface CardAccount {
  PrimaryAccountNumberID: XInvoiceNumberTag;
  NetworkID: XInvoiceStringTag;
  HolderName?: XInvoiceStringTag;
}
export type FinancialInstitutionBranch = Identification<XInvoiceNumberTag>;
export interface PayeeFinancialAccount
  extends Identification<XInvoiceNumberTag> {
  Name: XInvoiceStringTag;
  FinancialInstitutionBranch?: FinancialInstitutionBranch;
}
export type PayerFinancialAccount = Identification<XInvoiceNumberTag>;
export interface PaymentMandate extends Identification<XInvoiceNumberTag> {
  PayerFinancialAccount: PayerFinancialAccount;
}
export interface PaymentMeans {
  PaymentMeansCode: XInvoiceNumberTag<{ name: string }>;
  PaymentID: XInvoiceNumberTag;
  CardAccount?: CardAccount;
  PayeeFinancialAccount?: PayeeFinancialAccount;
  PaymentMandate?: PaymentMandate;
}
export interface PaymentTerms {
  Note: XInvoiceStringTag;
}
export interface TaxCategory extends Identification<XInvoiceNumberTag> {
  Percent?: XInvoiceNumberTag;
  TaxExemptionReasonCode?: XInvoiceNumberTag;
  TaxExemptionReason?: XInvoiceStringTag;
  TaxScheme: TaxScheme;
}
export interface TaxSubtotal {
  TaxableAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  TaxAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  TaxCategory: TaxCategory;
}
export interface TaxTotal {
  TaxAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  TaxSubtotal?: TaxSubtotal[];
}
export interface LegalMonetaryTotal {
  LineExtensionAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  TaxExclusiveAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  TaxInclusiveAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  AllowanceTotalAmount?: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  ChargeTotalAmount?: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  PrepaidAmount?: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  PayableRoundingAmount?: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  PayableAmount?: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
}
export interface OrderLineReference {
  LineId: XInvoiceNumberTag;
}

export interface DocumentReference {
  ID: XInvoiceStringTag<{ schemeID: string }>;
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
export type TaxScheme = Identification<XInvoiceEnumTag<TaxSchemeID>>;
export interface ClassifiedTaxCategory
  extends Identification<XInvoiceNumberTag> {
  Percent?: XInvoiceNumberTag;
  TaxScheme: TaxScheme;
}
export interface AdditionalItemProperty {
  Name: XInvoiceTag<any>;
  Value: XInvoiceTag<any>;
}
export interface StandardItemIdentification {
  ID: XInvoiceNumberTag<{ schemeID: string }>;
}
export interface Item {
  Description?: XInvoiceStringTag;
  Name: XInvoiceStringTag;
  BuyersItemIdentification?: Identification<XInvoiceNumberTag>;
  SellersItemIdentification?: Identification<XInvoiceNumberTag>;
  StandardItemIdentification?: StandardItemIdentification;
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
  Amount: XInvoiceNumberTag<{ currencyId: CurrencyCodes }>;
  BaseAmount?: XInvoiceNumberTag<{ currencyId: CurrencyCodes }>;
  Item: Item;
}
export interface Price {
  PriceAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
  BaseQuantity?: XInvoiceNumberTag<{ unitCode: string }>;
  AllowanceCharge?: AllowanceCharge;
}
export interface InvoiceLine {
  ID: XInvoiceNumberTag;
  Note?: XInvoiceStringTag;
  InvoicedQuantity: XInvoiceNumberTag<{ unitCode: string }>;
  LineExtensionAmount: XInvoiceNumberTag<{ currencyID: CurrencyCodes }>;
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
  PaymentTerms?: PaymentTerms[];
  AllowanceCharge?: AllowanceCharge[];
  TaxTotal: TaxTotal | [TaxTotal, TaxTotal];
  InvoiceLine: InvoiceLine[];
  LegalMonetaryTotal: LegalMonetaryTotal;
}
