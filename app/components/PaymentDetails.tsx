import React, { FunctionComponent } from 'react';
import { Col, Form, Input, Row } from 'antd';

interface Props {
    requireFields: boolean;
}
const PaymentDetails: FunctionComponent<Props> = (props) => {
    return (
        <>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="PaymentMeans.PaymentID"
                        label="Verwendungszweck"
                    >
                        <Input placeholder="Überweisung" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        required
                        name="PaymentMeans.PayeeFinancialAccount.ID"
                        label="IBAN"
                        rules={[
                            {
                                required: props.requireFields,
                                pattern: /^[A-Z]{2}(?:[ ]?[0-9]){18,20}$/,
                                message: 'Keine korrekte IBAN',
                            },
                        ]}
                    >
                        <Input placeholder="DE12345678912345678" />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={24}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: props.requireFields,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="PaymentTerms.Note"
                        label="Zahlungsbedingungen"
                    >
                        <Input placeholder="Zahlungsbedingungen" />
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export default PaymentDetails;
