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
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="ID"
                        label="Rechnungsnummer"
                    >
                        <Input placeholder="1234567" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        tooltip="Ein vom Erwerber zugewiesener und für interne Lenkungszwecke benutzter Bezeichner. (BT-10)"
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        name="BuyerReference"
                        label="Leitweg-ID"
                    >
                        <Input placeholder="991-01514-71" />
                    </Form.Item>
                </Col>
                
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Form.Item
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
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
            </Row>
        </>
    );
};

export default GeneralInformation;
