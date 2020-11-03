import XInvoiceTag, { AttributeType } from './XInvoiceTag';

export default class XInvoiceDateTag<
  Attributes extends AttributeType = undefined
> extends XInvoiceTag<Date, Attributes> {
  /**
   * Transforms the date value to a string -
   * this might even happen according to the attributes passed to the tag.
   * @returns {string}
   * @protected
   */
  protected valueToString(): string {
    return super.valueToString();
  }
}
