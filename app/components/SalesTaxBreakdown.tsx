import React from 'react';
import { Col, Form, Input, Row } from 'antd';

const SalesTaxBreakdown = () => {
  return (
    <Row gutter={16}>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxableAmount"
          label="Gesamtsumme netto"
        >
          <Input disabled placeholder="1234567" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxAmount"
          label="Umsatzsteuerbetrag"
        >
          <Input disabled placeholder="1234567" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name="TaxTotal.TaxSubtotal.TaxCategory.TaxExemptionReason"
          label="Befreiungsgrund"
        >
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default SalesTaxBreakdown;
