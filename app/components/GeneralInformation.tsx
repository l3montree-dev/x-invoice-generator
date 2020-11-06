import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';

const style = {
  datePicker: {
    width: '100%',
  },
};
const GeneralInformation = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item required name="ID" label="Rechnungsnummer">
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required name="BuyerReference" label="Leitweg-ID">
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required name="IssueDate" label="Rechnungsdatum">
            <DatePicker style={style.datePicker} picker="date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item required name="OrderReference.ID" label="Bestellnummer">
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required name="BuyerReference" label="Vertragsnummer">
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item required name="DueDate" label="Fälligkeitsdatum">
            <DatePicker style={style.datePicker} picker="date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="StartDate" label="Abrechnungszeitraum vom">
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="EndDate" label="Abrechnungszeitraum bis">
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="Note" label="Bemerkung">
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GeneralInformation;
