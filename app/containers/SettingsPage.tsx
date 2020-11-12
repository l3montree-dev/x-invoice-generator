import React from 'react';
import { Button, Form, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import SellerInformation from '../components/SellerInformation';
import PersistentStorage from '../services/PersistentStorage';
import Page from '../components/Page';
import PaymentDetails from '../components/PaymentDetails';

const style = {
  buttonContainer: {
    marginTop: '10px',
    float: 'right' as const,
  },
};
const SettingsPage = () => {
  const [form] = useForm();
  const handleFinish = (values: object) => {
    const instance = PersistentStorage.getInstance();
    instance.set('formData', values);
    message.success('Speichern erfolgreich!');
  };
  return (
    <Page title="Einstellungen">
      <h2>Informationen speichern</h2>
      <Form
        initialValues={PersistentStorage.getInstance().get('formData')}
        onFinish={handleFinish}
        layout="vertical"
        form={form}
      >
        <SellerInformation requireFields={false} />
        <PaymentDetails requireFields={false} />
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
