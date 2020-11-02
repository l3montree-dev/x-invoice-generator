import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceNumberTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Attributes> {
  isValid(): boolean {
    return false;
  }
}
