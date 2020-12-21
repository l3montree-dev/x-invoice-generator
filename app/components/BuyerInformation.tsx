import React from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import Countries from '../lib/x-invoice/constants';

const style = { width: '100%' };
const BuyerInformation = () => {
    return (
        <>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingCustomerParty.Party.PartyLegalEntity.RegistrationName"
                        label="Name"
                    >
                        <Input placeholder="Firma XY GmbH" />
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
                        <Input placeholder="DE123456789" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.PostalAddress.StreetName"
                        label="Straße & Hausnummer"
                    >
                        <Input placeholder="In der Muster Allee 24" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.PostalAddress.AdditionalStreetName"
                        label="Postfach"
                    >
                        <Input placeholder="8 15" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                pattern: /[0-9]{5}/,
                                message:
                                    'Postleitzahl muss aus mindestens 5 Zahlen bestehen',
                            },
                        ]}
                        name="AccountingCustomerParty.Party.PostalAddress.PostalZone"
                        label="PLZ"
                    >
                        <Input placeholder="53127" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.PostalAddress.CityName"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        label="Ort"
                    >
                        <Input placeholder="Bonn" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.PostalAddress.CountrySubentity"
                        label="Bundesland"
                    >
                        <Input placeholder="Nordrhein-Westfalen" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        name="AccountingCustomerParty.Party.PostalAddress.Country.IdentificationCode"
                        tooltip="Die zugrundeliegende genormte Liste ist momentan nur in englischer Sprache verfügbar."
                        label="Land"
                    >
                        <Select
                            showSearch
                            style={style}
                            placeholder="Land auswählen"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option?.children
                                    .toLowerCase()
                                    .indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {Object.entries(Countries).map(
                                ([value, readableName]) => (
                                    <Select.Option key={value} value={value}>
                                        {readableName}
                                    </Select.Option>
                                )
                            )}
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
                        <Input placeholder="Marianne Musterfrau" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.Contact.ElectronicMail"
                        label="E-Mail Adresse"
                    >
                        <Input
                            placeholder="marianne.musterfrau@musterxy.de"
                            type="email"
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        name="AccountingCustomerParty.Party.Contact.Telephone"
                        label="Telefon"
                    >
                        <Input placeholder="0228 32424911" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default BuyerInformation;
