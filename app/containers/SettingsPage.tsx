import React from 'react';
import { Button, Form, message, Row, Col, Input } from 'antd';
import { useForm } from 'antd/es/form/Form';
import SellerInformation from '../components/SellerInformation';
import Page from '../components/Page';
import UserSettingsFileHandle from '../services/UserSettingsFileHandle';

const style = {
    buttonContainer: {
        marginTop: '10px',
        paddingBottom: "10px",
        float: 'right' as const,
    },
};
const SettingsPage = () => {
    const [form] = useForm();
    const handleFinish = (values: object) => {
        const instance = UserSettingsFileHandle.get();
        instance.set({ formData: values });
        instance.save();
        message.success('Speichern erfolgreich!');
    };

    return (
        <Page title="Einstellungen">
            <h2>Informationen speichern</h2>
            <Form
                initialValues={UserSettingsFileHandle.get().read().formData}
                onFinish={handleFinish}
                layout="vertical"
                form={form}
            >
                <SellerInformation requireFields={false} />
                <Row>
                <Col span={12}>
                    <Form.Item
                        required
                        name="PaymentMeans.PayeeFinancialAccount.ID"
                        label="IBAN"
                        rules={[
                            {
                                required: false,
                                pattern: /^[A-Z]{2}(?:[ ]?[0-9]){18,20}$/,
                                message: 'Keine korrekte IBAN',
                            },
                        ]}
                    >
                        <Input placeholder="DE12345678912345678" />
                    </Form.Item>
                </Col>
                </Row>
    
                <Form.Item style={style.buttonContainer}>
                    <Button type="primary" htmlType="submit">
                        Speichern
                    </Button>
                </Form.Item>
            </Form>
        </Page>
    );
};

export default SettingsPage;
