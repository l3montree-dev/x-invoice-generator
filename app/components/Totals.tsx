import React from 'react';
import { Col, Form, Input, InputNumber, Row } from 'antd';

const Totals = () => {
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
            <InputNumber precision={2} step={0.01} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Totals;
