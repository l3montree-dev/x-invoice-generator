import XInvoiceTag, { AttributeType, TagOptions } from './XInvoiceTag';
import XInvoiceValidator from './XInvoiceValidator';

export default class XInvoiceURITag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<string, Attributes> {
  constructor(value: string, tagOptions?: TagOptions<string, Attributes>) {
    super(value, tagOptions ?? { validator: XInvoiceValidator.validateURI });
  }
}
