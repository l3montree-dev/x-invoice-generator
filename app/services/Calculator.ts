import { InvoiceLine } from '../lib/x-invoice/types';

export interface TaxReport {
    beforeTax: number;
    taxAmount: number;
    afterTax: number;
}

export interface FormInvoiceLine {
    InvoicedQuantity: number;
    'Price.PriceAmount': number;
    'Item.ClassifiedTaxCategory.Percent': number;
    'Item.SellerItemIdentification.ID': string;
    'Item.Name': string;
    'Item.ClassifiedTaxCategory.ID': string;
    'Item.ClassifiedTaxCategory.TaxScheme.ID': string;
    'Price.PriceAmount@currencyID': string;
    'LineExtensionAmount@currencyID'?: string;
    'InvoicedQuantity@unitCode': string;
}

export default class Calculator {
    public static getTotalsOfInvoiceLine(
        line: InvoiceLine | FormInvoiceLine
    ): TaxReport {
        let price: number;
        let percent: number;
        let quantity: number;
        if (
            'Price.PriceAmount' in line ||
            'Item.ClassifiedTaxCategory.Percent' in line
        ) {
            price = +(line['Price.PriceAmount'] ?? 0);
            percent = +(line['Item.ClassifiedTaxCategory.Percent'] ?? 0);
            quantity = +(line.InvoicedQuantity ?? 0);
        } else {
            price = +(line.Price?.PriceAmount ?? 0);
            percent = +(line.Item?.ClassifiedTaxCategory.Percent ?? 0);
            quantity = +(line.InvoicedQuantity ?? 0);
        }
        const beforeTax =
            Math.round((price * quantity + Number.EPSILON) * 100) / 100;
        percent /= 100;
        const taxAmount =
            Math.round((beforeTax * percent + Number.EPSILON) * 100) / 100;
        const afterTax = beforeTax + taxAmount;
        return { beforeTax, afterTax, taxAmount };
    }

    public static getTotalsOfInvoiceLines(
        lines?: (InvoiceLine | FormInvoiceLine)[]
    ): TaxReport {
        return (
            lines?.map(this.getTotalsOfInvoiceLine).reduce(
                (a, b) => {
                    return {
                        beforeTax: a.beforeTax + b.beforeTax,
                        afterTax: a.afterTax + b.afterTax,
                        taxAmount: a.taxAmount + b.taxAmount,
                    };
                },
                { beforeTax: 0, afterTax: 0, taxAmount: 0 }
            ) ?? { beforeTax: 0, afterTax: 0, taxAmount: 0 }
        );
    }
}
