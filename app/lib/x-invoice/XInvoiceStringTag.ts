import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceStringTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<string, Attributes> {}
