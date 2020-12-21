import moment from 'moment';
import { Invoice, Node, Tag } from '../lib/x-invoice/types';
import Calculator, { FormInvoiceLine } from './Calculator';
import XInvoice from '../lib/x-invoice/XInvoice';
import DefaultValueProvider from './DefaultValueProvider';

export default class Transformer {
    private static transformToMomentKeys = [
        'StartDate',
        'IssueDate',
        'EndDate',
        'DueDate',
    ];

    private static transformFlatToMomentKeys = [
        'DueDate',
        'IssueDate',
        'InvoicePeriod.StartDate',
        'InvoicePeriod.EndDate',
    ];

    private static saveAsArrayKeys = ['InvoiceLine'];

    /**
     * Transformation rules to create from a flat object an invoice object.
     *
     * 1. {TestName: "foo"} => {TestName: "foo"}
     * 2. {TestName.Bar: "foo"} => {TestName: {Bar: "foo"}}
     * 3. {TestName@attr: "foo", TestName: "bar"} => {TestName: {content: "bar", attributes: {attr: "foo"]}}}
     * @param {object} obj
     * @returns {Partial<Invoice>} We cannot be sure to return a correct invoice.
     */
    public static object2Invoice(obj: object): Invoice {
        const invoice: Node = {};
        Object.entries(Transformer.prepare(obj)).forEach(([tagName, value]) => {
            Transformer.safelySet(
                invoice,
                tagName.split('.') as (keyof Invoice)[],
                value
            );
        });
        return invoice;
    }

    /**
     * Serializes an invoice line element.
     * The antd form handler does provide a lot more information for a single element than necessary.
     * To remove the unused properties this method can be used.
     * @param {FormInvoiceLine} line
     * @returns {FormInvoiceLine}
     */
    public static serializeInvoiceLine(line: FormInvoiceLine): FormInvoiceLine {
        return {
            ...DefaultValueProvider.invoiceLine,
            'Item.SellerItemIdentification.ID':
                line['Item.SellerItemIdentification.ID'],
            'Item.Name': line['Item.Name'],
            InvoicedQuantity: line.InvoicedQuantity,
            'InvoicedQuantity@unitCode': line['InvoicedQuantity@unitCode'],
            'Price.PriceAmount': line['Price.PriceAmount'],
            'Item.ClassifiedTaxCategory.Percent':
                line['Item.ClassifiedTaxCategory.Percent'],
            'Item.ClassifiedTaxCategory.ID':
                line['Item.ClassifiedTaxCategory.ID'],
        };
    }

    public static invoice2Object(invoice: Node): object {
        return this.flatObject(invoice);
    }

    public static serialize(obj: object & { [key: string]: any }) {
        Object.entries(obj).forEach(([key, value]) => {
            if (Transformer.transformFlatToMomentKeys.includes(key)) {
                obj[key] = moment(value).format('YYYY-MM-DD');
            }
        });
        return obj;
    }

    public static inflate(obj: object & { [key: string]: any }) {
        const res: object & { [key: string]: any } = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (Transformer.transformFlatToMomentKeys.includes(key)) {
                const dateValue = moment(value, 'YYYY-MM-DD');
                if (dateValue.isValid()) {
                    res[key] = dateValue;
                }
            } else {
                res[key] = value;
            }
        });
        return res;
    }

    private static flatObject(obj: object): object {
        const result: object & { [key: string]: any } = {};
        Object.entries(obj).forEach(([key, value]) => {
            if (XInvoice.isLeaf(value)) {
                // lets check if the value contains an attribute
                if (typeof value === 'object' && 'content' in value) {
                    result[key] = value.content;
                    Object.entries(value.attributes).forEach(
                        ([attr, attrVal]) => {
                            result[`${key}@${attr}`] = attrVal;
                        }
                    );
                } else if (Transformer.transformToMomentKeys.includes(key)) {
                    result[key] = moment(value, 'YYYY-MM-DD');
                } else {
                    result[key] = value;
                }
            } else if (value instanceof Array) {
                // we need to handle arrays a bit different.
                // they should be kept - even after flatting.
                result[key] = value.map((el) => Transformer.flatObject(el));
            } else if (Transformer.saveAsArrayKeys.includes(key)) {
                const r = Transformer.flatObject(value);
                result[key] = [r];
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
                    const { beforeTax } = Calculator.getTotalsOfInvoiceLine(
                        line
                    );
                    return {
                        ...line,
                        LineExtensionAmount: beforeTax,
                        'LineExtensionAmount@currencyID': 'EUR',
                    };
                }
            );

            obj['TaxTotal.TaxSubtotal'] = obj.InvoiceLine.map(
                (line: FormInvoiceLine & { LineExtensionAmount: number }) => {
                    return {
                        TaxableAmount: line.LineExtensionAmount,
                        'TaxableAmount@currencyID': 'EUR',
                        'TaxAmount@currencyID': 'EUR',
                        TaxAmount: (
                            line.LineExtensionAmount *
                            (line['Item.ClassifiedTaxCategory.Percent'] / 100)
                        ).toFixed(2),
                        'TaxCategory.ID': line['Item.ClassifiedTaxCategory.ID'],
                        'TaxCategory.TaxScheme.ID': 'VAT',
                        'TaxCategory.Percent': line[
                            'Item.ClassifiedTaxCategory.Percent'
                        ].toFixed(2),
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
            Transformer.safelySet(destination[key], rest, value);
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
        } else if (value instanceof Array) {
            // we have to recursively do it for all members.
            destination[key] = value.map(Transformer.object2Invoice);
        } else {
            // might even be an array
            destination[key] = value;
        }
    }
}
