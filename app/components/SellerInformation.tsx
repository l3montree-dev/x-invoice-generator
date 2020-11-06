import React from 'react';
import { Col, Form, Input, Row } from 'antd';
import PostCodeFormItem from './PostCodeFormItem';
import CountrySelect from './CountrySelect';

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
            tooltip="Eine (i.d.R. vom Erwerber vergebene) Kennung des Verkäufers, wie z. B. die Kreditorennummer für das Mittelbewirtschaftungsverfahren oder die Lieferantennummer für das Bestellsystem."
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
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty.Party.PostalAddress.StreetName"
            label="Straße & Hausnummer"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty.Party.PostalAddress.AdditionalStreetName"
            label="Postfach"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <PostCodeFormItem name="AccountingSupplierParty.Party.PostalAddress.PostalZone" />
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty.Party.PostalAddress.CityName"
            label="Ort"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="AccountingSupplierParty.Party.PostalAddress.CountrySubentity"
            label="Bundesland"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.PostalAddress.Country.IdentificationCode"
            label="Land"
          >
            <CountrySelect />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.Contact.Name"
            label="Name"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.Contact.ElectronicMail"
            label="E-Mail Adresse"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            required
            name="AccountingSupplierParty.Party.Contact.Telephone"
            label="Telefon"
          >
            <Input placeholder="1234567" />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default SellerInformation;
