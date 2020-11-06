import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import Countries from '../lib/x-invoice/constants';

const style = {
  datePicker: {
    width: '100%',
  },
};
const BuyerInformation = () => {
  return (
    <>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingCustomerParty.Party.PartyLegalEntity.RegistrationName"
            label="Name"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="Invoice.AccountingCustomerParty.Party.PartyName.Name"
            label="Abweichender Handelsname"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="AccountingCustomerParty.Party.PartyTaxScheme.CompanyID"
            label="Umsatzsteuer-ID"
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="AccountingCustomerParty.Party.PostalAddress.StreetName"
            label="Straße & Hausnummer"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingCustomerParty.Party.PostalAddress.AdditionalStreetName"
            label="Postfach"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            rules={[
              {
                required: true,
                pattern: /[0-9]{5}/,
                message: 'Postleitzahl muss aus mindestens 5 Zahlen bestehen',
              },
            ]}
            name="AccountingCustomerParty.Party.PostalAddress.PostalZone"
            label="PLZ"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingCustomerParty.Party.PostalAddress.CityName"
            required
            label="Ort"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingCustomerParty.Party.PostalAddress.CountrySubentity"
            label="Bundesland"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            name="AccountingCustomerParty.Party.PostalAddress.Country.IdentificationCode"
            label="Land"
          >
            <Select
              showSearch
              style={style.datePicker}
              placeholder="Land auswählen"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {Object.entries(Countries).map(([value, readableName]) => (
                <Select.Option key={value} value={value}>
                  {readableName}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="AccountingCustomerParty.Party.Contact.Name"
            label="Name"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="AccountingCustomerParty.Party.Contact.ElectronicMail"
            label="E-Mail Adresse"
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name="AccountingCustomerParty.Party.Contact.Telephone"
            label="Telefon"
          >
            <Input type="email" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default BuyerInformation;
