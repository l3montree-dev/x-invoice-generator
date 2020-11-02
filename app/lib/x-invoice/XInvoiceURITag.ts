import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceURITag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Attributes> {
  isValid(): boolean {
    return false;
  }
}
