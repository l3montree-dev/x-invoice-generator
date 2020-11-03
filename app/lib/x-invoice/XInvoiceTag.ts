export type AttributeType = Record<string, string | number> | undefined;
export interface TagOptions<T, Attributes extends AttributeType> {
  validator?: (val: T) => boolean;
  attributes?: Attributes;
}
export default abstract class XInvoiceTag<
  T,
  Attributes extends AttributeType = undefined
> {
  static readonly UBL_TAG_PREFIX = 'cbc';

  protected attributes?: Attributes;

  protected validator?: (val: T) => boolean;

  protected constructor(
    protected value: T,
    tagOptions: TagOptions<T, Attributes>
  ) {
    this.attributes = tagOptions.attributes;
    this.validator = tagOptions.validator;
  }

  public isValid(): boolean {
    if (this.validator) return this.validator(this.value);
    // in the default case, we expect the tag to be valid.
    // not passing any validator means: any
    return true;
  }

  public toXMLTag(tagName: string) {
    let attributeString = this.attributesToString();
    if (attributeString) {
      // prepend a blank if the attribute string does actually exist.
      attributeString = ` ${attributeString}`;
    }
    return `<${XInvoiceTag.UBL_TAG_PREFIX}:${tagName}${attributeString}>${this.value}</${XInvoiceTag.UBL_TAG_PREFIX}:${tagName}>`;
  }

  protected attributesToString(): string {
    if (this.attributes) {
      return Object.entries(this.attributes ?? {})
        .map(([key, value]) => `${key}="${value}"`)
        .join(' ');
    }
    return '';
  }
}
