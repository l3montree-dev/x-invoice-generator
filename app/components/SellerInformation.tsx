import React, { FunctionComponent } from 'react';
import { Col, Form, Input, Row, Select } from 'antd';
import PostCodeFormItem from './PostCodeFormItem';
import Countries from '../lib/x-invoice/constants';

interface Props {
    requireFields: boolean;
}
const style = { width: '100%' };
const SellerInformation: FunctionComponent<Props> = (props) => {
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingSupplierParty.Party.PartyLegalEntity.RegistrationName"
                        label="Firmenname"
                    >
                        <Input placeholder="Testfirma GmbH" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingSupplierParty.Party.PartyName.Name"
                        label="Abweichender Handelsname"
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="AccountingSupplierParty.Party.PartyIdentification.ID"
                        label="Kennung"
                        tooltip="Eine (i.d.R. vom Erwerber vergebene) Kennung des Verkäufers, wie z. B. die Kreditorennummer für das Mittelbewirtschaftungsverfahren oder die Lieferantennummer für das Bestellsystem. (BT-29)"
                    >
                        <Input placeholder="0000123456" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingSupplierParty.Party.PartyTaxScheme.CompanyID"
                        label="Umsatzsteuer-ID"
                    >
                        <Input placeholder="DE123456789" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        name="AccountingSupplierParty.Party.PostalAddress.StreetName"
                        label="Straße & Hausnummer"
                    >
                        <Input placeholder="Musterstraße 32" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingSupplierParty.Party.PostalAddress.AdditionalStreetName"
                        label="Postfach"
                    >
                        <Input placeholder="8 15" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <PostCodeFormItem
                        required={props.requireFields}
                        name="AccountingSupplierParty.Party.PostalAddress.PostalZone"
                    />
                </Col>
                <Col span={12}>
                    <Form.Item
                        name="AccountingSupplierParty.Party.PostalAddress.CityName"
                        rules={[
                            {
                                required: props.requireFields,
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
                        name="AccountingSupplierParty.Party.PostalAddress.Country.IdentificationCode"
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
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingSupplierParty.Party.Contact.Name"
                        label="Name"
                    >
                        <Input placeholder="Max Mustermann" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingSupplierParty.Party.Contact.ElectronicMail"
                        label="E-Mail Adresse"
                    >
                        <Input placeholder="max.mustermann@l3montree.com" />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="AccountingSupplierParty.Party.Contact.Telephone"
                        label="Telefon"
                    >
                        <Input placeholder="0228 123456" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default SellerInformation;
