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
          <Form.Item
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            name="ID"
            label="Rechnungsnummer"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            tooltip="Ein vom Erwerber zugewiesener und für interne Lenkungszwecke benutzter Bezeichner."
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            name="BuyerReference"
            label="Leitweg-ID"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            tooltip="Eine vom Erwerber ausgegebene Kennung für eine referenzierte Bestellung."
            name="OrderReference.ID"
            label="Bestellnummer"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            required
            name="IssueDate"
            label="Rechnungsdatum"
          >
            <DatePicker
              placeholder="Datum auswählen"
              style={style.datePicker}
              picker="date"
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            required
            name="DueDate"
            label="Fälligkeitsdatum"
          >
            <DatePicker
              placeholder="Datum auswählen"
              style={style.datePicker}
              picker="date"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            tooltip="Das Datum, an dem der Rechnungszeitraum beginnt."
            name="StartDate"
            label="Abrechnungszeitraum vom"
          >
            <DatePicker
              placeholder="Datum auswählen"
              style={style.datePicker}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            tooltip="Das Datum, an dem der Rechnungszeitraum endet."
            name="EndDate"
            label="Abrechnungszeitraum bis"
          >
            <DatePicker
              placeholder="Datum auswählen"
              style={style.datePicker}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name="Note" label="Bemerkung">
            <Input />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default GeneralInformation;
