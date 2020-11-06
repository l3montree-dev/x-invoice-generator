import React from 'react';
import { Col, DatePicker, Form, Input, Row } from 'antd';

const style = {
  datePicker: {
    width: '100%',
  },
};
const SellerInformation = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.PartyLegalEntity.RegistrationName"
            label="Firmenname"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty.Party.PartyName.Name"
            label="Abweichender Handelsname"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="AccountingSupplierParty.Party.PartyIdentification.ID"
            label="Kennung"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.PartyTaxScheme.CompanyID"
            label="Umsatzsteuer-ID"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.PartyTaxScheme.CompanyID"
            label="Steuernummer"
          >
            <DatePicker style={style.datePicker} picker="date" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> StreetName"
            label="Straße & Hausnummer"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> AdditionalStreetName"
            label="Postfach"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> PostalZone"
            label="PLZ"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> CityName"
            label="Ort"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> CountrySubentity"
            label="Bundesland"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> PostalAddress -> Country -> IdentificationCode"
            label="Land"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> Contact -> Name"
            label="Name"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> Contact -> ElectronicMail"
            label="E-Mail Adresse"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty -> Party -> Contact -> Telephone"
            label="Telefon"
          >
            <DatePicker style={style.datePicker} />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default SellerInformation;
