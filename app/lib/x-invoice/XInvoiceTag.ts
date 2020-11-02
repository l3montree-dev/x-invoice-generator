export type AttributeType = Record<string, string | number> | undefined;

export default abstract class XInvoiceTag<
  Attributes extends AttributeType = undefined
> {
  public abstract isValid(): boolean;

  constructor(protected content: string, protected attributes?: Attributes) {}

  protected attributesToString(): string {
    if (this.attributes) {
      return Object.entries(this.attributes ?? {})
        .map(([key, value]) => `${key}=${value}`)
        .join(' ');
    }
    return '';
  }

  public toXMLTag(tagName: string) {
    return `<${tagName} ${this.attributesToString()}>${this.content}</>`;
  }
}
