import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceEMailTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<string, Attributes> {}
