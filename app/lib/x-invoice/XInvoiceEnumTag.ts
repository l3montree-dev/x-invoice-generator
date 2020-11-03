import XInvoiceTag, { AttributeType, TagOptions } from './XInvoiceTag';

export default class XInvoiceEnumTag<
  T,
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<T, Attributes> {
  constructor(value: T, tagOptions?: TagOptions<T, Attributes>) {
    super(value, tagOptions ?? { validator: () => true });
  }
}
