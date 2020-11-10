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
  public static object2Invoice(obj: object): Node {
    const invoice: Node = {};
    Object.entries(obj).forEach(([tagName, value]) => {
      this.safelySet(invoice, tagName.split('.') as (keyof Invoice)[], value);
    });
    return invoice;
  }

  private static safelySet(
    destination: Node,
    path: (keyof Invoice)[],
    value: Tag
  ) {
    const [key, ...rest] = path;
    if (path.length > 1) {
      // build the object at this point.
      if (!destination[key]) {
        destination[key] = {};
      }
      this.safelySet(destination[key], rest, value);
    } else if (key.includes('@')) {
      const [tagName, attributeName] = key.split('@');
      // the content might already be defined.
      let content = destination[tagName];
      if (typeof destination[tagName] === 'object') {
        content = destination[tagName].content;
      }
      destination[tagName] = {
        content,
        attributes: {
          ...destination[tagName]?.attributes,
          [attributeName]: value,
        },
      };
    } else if (typeof destination[key] === 'object') {
      destination[key] = {
        ...destination[key],
        content: value,
      };
    } else {
      destination[key] = value;
    }
  }
}
