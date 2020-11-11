import moment from 'moment';
import { Invoice, Node, Tag } from '../lib/x-invoice/types';
import Calculator, { FormInvoiceLine } from './Calculator';
import XInvoice from '../lib/x-invoice/XInvoice';

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
    Object.entries(this.prepare(obj)).forEach(([tagName, value]) => {
      this.safelySet(invoice, tagName.split('.') as (keyof Invoice)[], value);
    });
    return invoice;
  }

  public static invoice2Object(invoice: Node): object {
    return this.flatObject(invoice);
  }

  private static flatObject(obj: object): object {
    const result: object & { [key: string]: any } = {};
    Object.entries(obj).forEach(([key, value]) => {
      if (XInvoice.isLeaf(value)) {
        // lets check if the value contains an attribute
        if (typeof value === 'object' && 'content' in value) {
          result[key] = value.content;
          Object.entries(value.attributes).forEach(([attr, attrVal]) => {
            result[`${key}@${attr}`] = attrVal;
          });
        } else {
          result[key] = value;
        }
      } else if (value instanceof Array) {
        // we need to handle arrays a bit different.
        // they should be kept - even after flatting.
        result[key] = value.map(Transformer.flatObject);
      } else {
        // it has to be an object now.
        // we have to recursively call this merge method.
        const flatObject = Transformer.flatObject(value);
        Object.entries(flatObject).forEach(([k, v]) => {
          result[`${key}.${k}`] = v;
        });
      }
    });
    return result;
  }

  private static prepare(obj: object): object {
    const result: Node = {};
    Object.entries(obj).forEach(([tagName, value]) => {
      if (moment.isMoment(value)) {
        result[tagName] = value.format('YYYY-MM-DD');
      } else if (value !== undefined) {
        result[tagName] = value;
      }
      // we skip undefined values.
    });
    return this.transformInvoiceLine(result);
  }

  private static transformInvoiceLine(obj: Node): Node {
    if ('InvoiceLine' in obj && obj.InvoiceLine instanceof Array) {
      // yes we can do the calculation.
      obj.InvoiceLine = obj.InvoiceLine.map(
        (
          line: FormInvoiceLine
        ): FormInvoiceLine & { LineExtensionAmount: number } => {
          const { beforeTax } = Calculator.getTotalsOfInvoiceLine(line);
          return {
            ...line,
            LineExtensionAmount: beforeTax,
          };
        }
      );
    }
    return obj;
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
      // might even be an array
      destination[key] = value;
    }
  }
}
