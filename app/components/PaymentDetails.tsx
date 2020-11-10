import React from 'react';
import { Col, Form, Input, Row } from 'antd';

const PaymentDetails = () => {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Form.Item
          required
          rules={[
            { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
          ]}
          name="PaymentMeans.PaymentMeansCode@name"
          label="Zahlungsmittel"
        >
          <Input placeholder="Überweisung" />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          required
          name="PaymentMeans.PayeeFinancialAccount.ID "
          label="IBAN"
          rules={[
            {
              required: true,
              pattern: /^[A-Z]{2}(?:[ ]?[0-9]){18,20}$/,
              message: 'Keine korrekte IBAN',
            },
          ]}
        >
          <Input placeholder="DE12345678912345678" />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PaymentDetails;
