import React, { FunctionComponent, useCallback, useEffect } from 'react';
import { Col, Form, Input, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import Calculator, { FormInvoiceLine } from '../services/Calculator';
import EventEmitter, { EventKeys } from '../services/EventEmitter';

interface Props {
  formHandler: FormInstance;
}
const SalesTaxBreakdown: FunctionComponent<Props> = (props) => {
  const priceChangeListener = useCallback(() => {
    const invoiceLine: FormInvoiceLine[] = props.formHandler.getFieldValue(
      'InvoiceLine'
    );

    const { taxAmount, beforeTax } = Calculator.getTotalsOfInvoiceLines(
      invoiceLine
    );
    props.formHandler.setFieldsValue({
      'TaxTotal.TaxSubtotal.TaxableAmount': beforeTax,
      'TaxTotal.TaxSubtotal.TaxAmount': taxAmount,
    });
  }, [props.formHandler]);

  useEffect(() => {
    EventEmitter.registerListener(EventKeys.PRICE_CHANGE, priceChangeListener);
    priceChangeListener();
    return () => {
      EventEmitter.removeListener(EventKeys.PRICE_CHANGE, priceChangeListener);
    };
  }, [priceChangeListener]);
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxableAmount"
          label="Gesamtsumme netto"
        >
          <Input disabled placeholder="xx.yy" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxAmount"
          label="Umsatzsteuerbetrag"
        >
          <Input disabled placeholder="aa.bb" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxCategory.TaxExemptionReason"
          label="Befreiungsgrund"
          tooltip="In Textform angegebener Grund für die Ausnahme des Betrages von der Umsatzsteuerpflicht."
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default SalesTaxBreakdown;
