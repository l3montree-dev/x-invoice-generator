import { Invoice, Node } from './types';
import XInvoiceTag from './XInvoiceTag';

export default class XInvoice {
  constructor(protected invoice: Invoice) {}

  protected recursiveXMLGeneration(node: Node): string {
    // there are only three cases, which might happen here.
    // node represents a leaf, or node is an object.
    return Object.entries(node)
      .map(([tagName, value]) => {
        if (value instanceof XInvoiceTag) {
          // we are reached the leaf
          return value.toXMLTag(tagName);
        }
        return `<cac:${tagName}>${this.recursiveXMLGeneration(
          value
        )}</cac:${tagName}>`;
      })
      .join('\n');
  }

  public toXML(): string {
    return `<ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2.xsd">${this.recursiveXMLGeneration(
      this.invoice
    )}</ubl:Invoice>`;
  }
}
