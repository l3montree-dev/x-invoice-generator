import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceEnumTag<
  T,
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<T, Attributes> {}
