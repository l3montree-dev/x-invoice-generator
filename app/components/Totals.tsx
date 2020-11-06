import React from 'react';
import { Col, Form, Input, Row } from 'antd';

const Totals = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            required
            name="LegalMonetaryTotal.LineExtensionAmount"
            label="Summe aller Positionen netto"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="LegalMonetaryTotal.TaxExclusiveAmount"
            label="Gesamtsumme netto"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="TaxTotal.TaxAmount"
            label="Summe Umsatzsteuer"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            required
            name="LegalMonetaryTotal.TaxInclusiveAmount"
            label="Gesamtsumme brutto"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            name="LegalMonetaryTotal.PayableAmount"
            label="Fälliger Betrag"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Totals;
