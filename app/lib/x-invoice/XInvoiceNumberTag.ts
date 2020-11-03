import XInvoiceTag, { AttributeType, TagOptions } from './XInvoiceTag';

export default class XInvoiceNumberTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<number, Attributes> {
  constructor(value: number, tagOptions?: TagOptions<number, Attributes>) {
    super(value, tagOptions ?? { validator: (val) => val > 0 });
  }
}
