export interface TagWithAttributes<Attributes extends object> {
    attributes: Attributes;
    content: string;
}

export type Tag = TagWithAttributes<any> | string;

export interface InvoicePeriod {
    StartDate?: string;
    EndDate?: string;
    DescriptionCode?: string;
}

export interface OrderReference extends Identification {
    SalesOrderID?: string;
}

export interface BillingReference {
    InvoiceDocumentReference: InvoiceDocumentReference;
}

export interface InvoiceDocumentReference extends Identification {
    IssueDate?: string;
}

export type DespatchDocumentReference = Identification;

export type ReceiptDocumentReference = Identification;

export type OriginatorDocumentReference = Identification;

export type ContractDocumentReference = Identification;

export interface AdditionalDocumentReference extends Identification {
    DocumentTypeCode?: '130';
    DocumentDescription?: string;
    Attachment?: Attachment;
}

export interface Attachment {
    EmbeddedDocumentBinaryObject?: string;
    ExternalReference?: ExternalReference;
}

export interface ExternalReference {
    URI: string;
}

export type ProjectReference = Identification;

export interface AccountingSupplierParty {
    Party: Party;
}

export interface Party {
    EndpointID?: TagWithAttributes<{ schemeID: string }>;
    PartyIdentification?: PartyIdentification | PartyIdentification[];
    PartyName?: PartyName;
    PostalAddress: PostalAddress;
    PartyTaxScheme?: PartyTaxScheme | [PartyTaxScheme, PartyTaxScheme];
    PartyLegalEntity: PartyLegalEntity;
    Contact?: Contact;
}

export interface PartyIdentification {
    ID: TagWithAttributes<{ schemeID: string }> | string;
}

export interface PartyName {
    Name: string;
}

export interface PostalAddress {
    StreetName?: string;
    AdditionalStreetName?: string;
    CityName?: string;
    PostalZone?: string;
    CountrySubentity?: string;
    AddressLine?: AddressLine;
    Country: Country;
}

export interface AddressLine {
    Line: string;
}

export interface Country {
    IdentificationCode: string;
}

export interface PartyTaxScheme {
    CompanyID: string;
    TaxScheme: TaxScheme;
}

export interface PartyLegalEntity {
    RegistrationName: string;
    CompanyID?: TagWithAttributes<{ schemeID: string }>;
    CompanyLegalForm?: string;
}
export interface Contact {
    Name?: string;
    Telephone?: string;
    ElectronicMail?: string;
}
export type PayeeParty = Party;
export interface AccountingCustomerParty {
    Party: Party;
}

export interface TaxRepresentativeParty {
    PartyName: PartyName;
    PostalAddress: PostalAddress;
    PartyTaxScheme: PartyTaxScheme;
}
export interface DeliveryParty {
    Name: PartyName;
}
export interface DeliveryLocation {
    ID: TagWithAttributes<{ schemeID: string }>;
    Address: PostalAddress;
    DeliveryParty: DeliveryParty;
}
export interface Delivery {
    ActualDeliveryDate: string;
    DeliveryLocation: DeliveryLocation;
}
export interface CardAccount {
    PrimaryAccountNumberID: string;
    NetworkID: string;
    HolderName?: string;
}
export type FinancialInstitutionBranch = Identification;
export interface PayeeFinancialAccount extends Identification {
    Name: string;
    FinancialInstitutionBranch?: FinancialInstitutionBranch;
}
export type PayerFinancialAccount = Identification;
export interface PaymentMandate extends Identification {
    PayerFinancialAccount: PayerFinancialAccount;
}
export interface PaymentMeans {
    PaymentMeansCode: TagWithAttributes<{ name: string }> | string;
    PaymentID: string;
    CardAccount?: CardAccount;
    PayeeFinancialAccount?: PayeeFinancialAccount;
    PaymentMandate?: PaymentMandate;
}
export interface PaymentTerms {
    Note: string;
}
export interface TaxCategory extends Identification {
    Percent?: string;
    TaxExemptionReasonCode?: string;
    TaxExemptionReason?: string;
    TaxScheme: TaxScheme;
}
export interface TaxSubtotal {
    TaxableAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    TaxAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    TaxCategory: TaxCategory;
}
export interface TaxTotal {
    TaxAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    TaxSubtotal?: TaxSubtotal | TaxSubtotal[];
}
export interface LegalMonetaryTotal {
    LineExtensionAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    TaxExclusiveAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    TaxInclusiveAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    AllowanceTotalAmount?: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    ChargeTotalAmount?: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    PrepaidAmount?: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    PayableRoundingAmount?: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    PayableAmount?: TagWithAttributes<{ currencyID: CurrencyCodes }>;
}
export interface OrderLineReference {
    LineId: string;
}

export interface DocumentReference {
    ID: TagWithAttributes<{ schemeID: string }>;
    DocumentTypeCode: 130;
}
export enum Bool {
    true,
    false,
}
export interface Identification {
    ID: string;
}
export enum IdentificationCode {
    CN,
}
export interface OriginCountry {
    IdentificationCode: string;
}
export interface CommodityClassification {
    ItemClassificationCode: string;
}

export enum TaxSchemeID {
    VAT,
}
export type TaxScheme = Identification;
export interface ClassifiedTaxCategory extends Identification {
    Percent?: string;
    TaxScheme: TaxScheme;
}
export interface AdditionalItemProperty {
    Name: string;
    Value: string;
}
export interface StandardItemIdentification {
    ID: TagWithAttributes<{ schemeID: string }>;
}
export interface Item {
    Description?: string;
    Name: string;
    BuyersItemIdentification?: Identification;
    SellersItemIdentification?: Identification;
    StandardItemIdentification?: StandardItemIdentification;
    OriginCountry?: OriginCountry;
    CommodityClassification?: CommodityClassification;
    ClassifiedTaxCategory: ClassifiedTaxCategory;
    AdditionalItemProperty?: AdditionalItemProperty[];
}
export interface AllowanceCharge {
    ChargeIndicator: string;
    AllowanceChargeReasonCode?: string;
    AllowanceChargeReason?: string;
    MultiplierFactorNumeric: string;
    Amount: TagWithAttributes<{ currencyId: CurrencyCodes }>;
    BaseAmount?: TagWithAttributes<{ currencyId: CurrencyCodes }>;
    Item: Item;
}
export interface Price {
    PriceAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    BaseQuantity?: TagWithAttributes<{ unitCode: string }>;
    AllowanceCharge?: AllowanceCharge;
}
export interface InvoiceLine {
    ID: string;
    Note?: string;
    InvoicedQuantity: TagWithAttributes<{ unitCode: string }>;
    LineExtensionAmount: TagWithAttributes<{ currencyID: CurrencyCodes }>;
    AccountingCost?: string;
    InvoicePeriod?: InvoicePeriod;
    OrderLineReference?: OrderLineReference;
    DocumentReference?: DocumentReference;
    AllowanceCharge?: AllowanceCharge[];
    Item: Item;
    Price: Price;
}

export type CurrencyCodes = 'EUR';

export enum TaxCurrencyCode {}

export interface Invoice extends Node {
    CustomizationID: string;
    ID: string;
    IssueDate: string;
    DueDate?: string;
    InvoiceTypeCode: string;
    Note?: string;
    TaxPointDate?: string;
    DocumentCurrencyCode: string;
    TaxCurrencyCode?: string;
    AccountingCost?: string;
    BuyerReference: string;
    InvoicePeriod?: InvoicePeriod;
    BillingsReference?: BillingReference[];
    DespatchDocumentReference?: DespatchDocumentReference;
    ReceiptDocumentReference?: ReceiptDocumentReference;
    OriginatorDocumentReference?: OriginatorDocumentReference;
    ContractDocumentReference?: ContractDocumentReference;
    AdditionalDocumentReference?: AdditionalDocumentReference[];
    ProjectReference?: ProjectReference;
    AccountingSupplierParty: AccountingSupplierParty;
    AccountingCustomerParty: AccountingCustomerParty;
    PayeeParty?: PayeeParty;
    TaxRepresentativeParty?: TaxRepresentativeParty;
    Delivery?: Delivery;
    PaymentMeans?: PaymentMeans | PaymentMeans[];
    OrderReference: OrderReference;
    PaymentTerms?: PaymentTerms | PaymentTerms[];
    AllowanceCharge?: AllowanceCharge[];
    TaxTotal: TaxTotal | TaxTotal[];
    LegalMonetaryTotal: LegalMonetaryTotal;
    InvoiceLine: InvoiceLine[];
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type Node = Record<string, Tag | Node>;
