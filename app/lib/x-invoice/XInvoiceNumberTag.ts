import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceNumberTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<number, Attributes> {}
