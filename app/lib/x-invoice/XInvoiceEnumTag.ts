import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceEnumTag<
  T,
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Attributes> {
  isValid(): boolean {
    return false;
  }
}
