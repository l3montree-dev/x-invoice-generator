// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { parseStringPromise } from 'xml2js';
import { promises as fs } from 'fs';
import { join } from 'path';
import { validate } from 'schematron-runner';
import { ICompletedValidation } from 'schematron-runner/esm/validator';
import { Invoice, Node, Tag } from './types';
import DefaultValueProvider from "../../services/DefaultValueProvider";

export default class XInvoice {
    protected static possibleRootTags = ['ubl:Invoice', 'Invoice'];
    protected invoice: Invoice;

    constructor(invoice: Invoice) {
        this.invoice = this.recursiveInvoiceOrder(invoice) as Invoice;
    }

    public getInvoice(): Invoice {
        return this.invoice;
    }

    public static validateURI(uri: string): boolean {
        return /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/g.test(
            uri
        );
    }

    public static validateEMail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    public static validateDateString(date: string) {
        return /\d{4}-\d{2}-\d{2}/.test(date);
    }

    public static async validateXInvoice(
        xml: string,
        path: string = __dirname
    ): Promise<boolean> {
        const results = await this.validateXInvoiceWithResults(xml, path);
        return results.errors.length === 0 && results.passed.length > 0;
    }

    public static async validateXInvoiceWithResults(
        xml: string,
        path: string = __dirname
    ): Promise<ICompletedValidation> {
        const schematron = await fs.readFile(
            join(
                path,
                'schematron',
                'ubl-inv',
                'XRechnung-UBL-validation-Invoice.sch'
            ),
            'utf8'
        );
        return validate(xml, schematron, {
            resourceDir: join(path, 'schematron', 'ubl-inv', 'empty'),
        });
    }

    public recursiveInvoiceOrder(invoice: Node): Node {
        return Object.entries(invoice)
            .sort(([a], [b]) => (DefaultValueProvider.orderLookupTable[a] !== undefined ? DefaultValueProvider.orderLookupTable[a] :  Infinity) - (DefaultValueProvider.orderLookupTable[b] !== undefined ? DefaultValueProvider.orderLookupTable[b] :  Infinity))
            .map(([tagName, value]) => {
            if (value instanceof Array) {
                return {[tagName]: value
                    .map((val: object) => {
                        return this.recursiveInvoiceOrder(val);
                    })};
            }
            if (XInvoice.isLeaf(value)) {
                return { [tagName]: value };
            }
            return {[tagName]: this.recursiveInvoiceOrder(value)}
        }).reduce((a, b) => ({ ...a, ...b }), {});
    }

    public static isLeaf(obj: Node | Tag): boolean {
        switch (typeof obj) {
            // it is always a leaf, if it is a scalar value.
            case 'object':
                // either it is a node or a TagWithAttributes
                // TagWithAttributes contain the content property.
                if (obj === null) {
                    return true;
                }
                return 'content' in obj;
            default:
                return true;
        }
    }

    protected static recursiveInvoiceGeneration(obj: Node): Partial<Invoice> {
        return (
            Object.keys(obj)
                .map((key) => {
                    if (key.startsWith('cac:')) {
                        const tagName = key.substr(4);
                        // we have to check, if the value is an array. this is perfectly possible.
                        // an array is identified by having at least 2 elements.
                        if (obj[key].length > 1) {
                            return {
                                [tagName]: obj[key].map((el: Node) =>
                                    this.recursiveInvoiceGeneration(el)
                                ),
                            };
                        }
                        return {
                            [tagName]: this.recursiveInvoiceGeneration(
                                obj[key][0]
                            ),
                        };
                    }
                    if (key.startsWith('cbc:')) {
                        // the simple case.
                        // we finished the recursion
                        const tagName = key.substr(4);
                        // lets checkout if there are any attributes for this tag.
                        // const attr: object | undefined = obj[key].$;
                        // since we are using xml2js - which is not capable of identifying scalar values
                        // we need to index the first element of the array.
                        let tag = obj[key][0];
                        if (typeof tag === 'object') {
                            // it is a tag with some attributes.
                            // we find the value at: _
                            // and the attributes at: $;
                            tag = { content: tag._, attributes: tag.$ };
                        }
                        // const attr;
                        return { [tagName]: tag };
                    }
                    // lets skip it.
                    return null;
                })
                // filter all null values.
                // yes its not tail recursive.
                .filter((entry) => entry)
                .reduce((a, b) => ({ ...a, ...b }), {}) as Partial<Invoice>
        );
    }

    public static async fromXML(xml: string): Promise<Partial<Invoice>> {
        // we have to create the Invoice javascript object.
        // this object is the bridge between a user interface and the xml data structure.
        const obj = await parseStringPromise(xml);
        // lets identify the root node, depending on the starting tag.
        const rootTag = this.possibleRootTags.find((entry) => entry in obj);
        if (rootTag) {
            return this.recursiveInvoiceGeneration(obj[rootTag]);
        }
        throw new Error('Invalid invoice - no root tag found.');
    }

    protected static attributeString(leaf: Tag): string {
        if (typeof leaf === 'object' && leaf !== null && 'content' in leaf) {
            // transform the attributes to a string.
            return ` ${Object.entries(leaf.attributes)
                .map(
                    ([attributeName, attributeValue]) =>
                        `${attributeName}="${attributeValue}"`
                )
                .join(' ')}`;
        }

        return '';
    }

    protected static leafValue(leaf: Tag): string {
        if (typeof leaf === 'object' && leaf !== null && 'content' in leaf) {
            // transform the attributes to a string.
            return leaf.content;
        }
        return leaf;
    }

    public static formatXml(xml: string) {
        let formatted = '';
        let indent = '';
        const tab = '\t';
        xml.split(/>\s*</).forEach((node) => {
            if (node.match(/^\/\w/)) indent = indent.substring(tab.length); // decrease indent by one 'tab'
            formatted += `${indent}<${node}>\r\n`;
            if (node.match(/^<?\w[^>]*[^/]$/)) indent += tab; // increase indent
        });
        return formatted.substring(1, formatted.length - 3);
    }

    protected recursiveXMLGeneration(node: Node): string {
        // there are only three cases, which might happen here.
        // node represents a leaf, or node is an object.
        return Object.entries(node)
            .map(([tagName, value]) => {
                if (value instanceof Array) {
                    // if the value is an array we have to duplicate this node for each child.
                    return value
                        .map((val) => {
                            return this.recursiveXMLGeneration({
                                [tagName]: val,
                            });
                        })
                        .join('');
                }
                if (XInvoice.isLeaf(value)) {
                    // we are reached the leaf
                    // check if it has attributes.
                    return `<cbc:${
                        tagName.split('@')[0]
                    }${XInvoice.attributeString(
                        value as Tag
                    )}>${XInvoice.leafValue(value as Tag)}</cbc:${
                        tagName.split('@')[0]
                    }>`;
                }
                return `<cac:${tagName}>
${this.recursiveXMLGeneration(value)}
</cac:${tagName}>`;
            })
            .join('\n');
    }

    public toXML(): string {
        return `<?xml version="1.0" encoding="UTF-8"?><ubl:Invoice xmlns:ubl="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2" xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2" xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2.xsd">
    <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:xoev-de:kosit:standard:xrechnung_2.0</cbc:CustomizationID>
${this.recursiveXMLGeneration(this.invoice)}
</ubl:Invoice>`;
    }
}
