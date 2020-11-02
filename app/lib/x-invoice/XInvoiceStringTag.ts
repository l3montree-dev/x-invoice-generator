import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceStringTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Attributes> {
  isValid(): boolean {
    return false;
  }
}
