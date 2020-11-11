import React, { FunctionComponent, useEffect } from 'react';
import { Col, Form, Input, InputNumber, Row } from 'antd';
import { FormInstance } from 'antd/es/form';
import Calculator, { FormInvoiceLine } from '../services/Calculator';
import EventEmitter, { EventKeys } from '../services/EventEmitter';

interface Props {
  formHandler: FormInstance;
}
const Totals: FunctionComponent<Props> = (props) => {
  // the totals need to be calculated live.
  // therefore we need to get the invoice line value.
  const priceChangeListener = () => {
    const invoiceLine: FormInvoiceLine[] = props.formHandler.getFieldValue(
      'InvoiceLine'
    );

    const {
      taxAmount,
      beforeTax,
      afterTax,
    } = Calculator.getTotalsOfInvoiceLines(invoiceLine);
    props.formHandler.setFieldsValue({
      'TaxTotal.TaxAmount': taxAmount,
      'LegalMonetaryTotal.LineExtensionAmount': beforeTax,
      'LegalMonetaryTotal.TaxExclusiveAmount': beforeTax,
      'LegalMonetaryTotal.TaxInclusiveAmount': afterTax,
      'LegalMonetaryTotal.PayableAmount': afterTax,
    });
  };

  useEffect(() => {
    EventEmitter.registerListener(EventKeys.PRICE_CHANGE, priceChangeListener);
    priceChangeListener();
    return () => {
      EventEmitter.removeListener(EventKeys.PRICE_CHANGE, priceChangeListener);
    };
  }, [priceChangeListener]);

  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="LegalMonetaryTotal.LineExtensionAmount"
            label="Summe aller Positionen netto"
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="LegalMonetaryTotal.TaxExclusiveAmount"
            label="Gesamtsumme netto"
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="TaxTotal.TaxAmount" label="Summe Umsatzsteuer">
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="LegalMonetaryTotal.TaxInclusiveAmount"
            label="Gesamtsumme brutto"
          >
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            rules={[
              {
                required: true,
                message: 'Dieses Feld muss ausgefüllt werden',
              },
            ]}
            name="LegalMonetaryTotal.PayableAmount"
            label="Fälliger Betrag"
          >
            <InputNumber disabled precision={2} step={0.01} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Totals;
