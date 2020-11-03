import XInvoiceTag, { AttributeType, TagOptions } from './XInvoiceTag';

export default class XInvoiceURITag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<string, Attributes> {
  constructor(value: string, tagOptions?: TagOptions<string, Attributes>) {
    super(value, tagOptions ?? { validator: (val) => val !== '' });
  }
}
