import { Invoice, Node, Tag } from '../lib/x-invoice/types';

export default class Transformer {
  /**
   * Transformation rules to create from a flat object an invoice object.
   *
   * 1. {TestName: "foo"} => {TestName: "foo"}
   * 2. {TestName.Bar: "foo"} => {TestName: {Bar: "foo"}}
   * 3. {TestName@attr: "foo", TestName: "bar"} => {TestName: {content: "bar", attributes: {attr: "foo"]}}}
   * @param {object} obj
   * @returns {Partial<Invoice>} We cannot be sure to return a correct invoice.
   */
  public static object2Invoice(obj: object): Partial<Invoice> {
    const invoice: Partial<Invoice> = {};
    Object.entries(obj).forEach(([tagName, value]) => {
      this.safelySet(invoice, tagName, value);
    });
    return invoice;
  }

  private static safelySet(destination: Node, path: string, value: Tag) {
    const keys = path.split('.');
    const [key, ...rest] = keys;
    if (keys.length > 1) {
      if (destination[key]) {
        destination[key] = {
          ...destination[key],
        };
      }
      // we have to do some recursion.
    } else {
      // we can just set the value
      // lets check if the path does contain an attribute sign
      if (key.includes('@')) {
        // we have to built a nested object.
        if (destination[key]) {
          // probably only the attribute missing
          destination[key] = {
            ...destination[key],
            attributes: {
              ...destination[key].attributes,
              key: value,
            },
          };
        } else {
          // the attribute was evaluated first.
          // we have to create the object.
          destination[key] = {
            attributes: {
              [key]: value,
            },
          };
        }
      }
    }
  }
}
