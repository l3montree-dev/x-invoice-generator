import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceDateTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Attributes> {
  isValid(): boolean {
    return false;
  }
}
