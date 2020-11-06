import React, { FunctionComponent } from 'react';
import { Form } from 'antd';
import New from '../features/new/New';
import Page from '../components/Page';
import { Invoice } from '../lib/x-invoice/types';

const NewPage: FunctionComponent = () => {
  const [form] = Form.useForm<Invoice>();
  const handleSubmit = (values) => {
    console.log(values);
  };
  return (
    <Page>
      <New formHandler={form} onSubmit={handleSubmit} />
    </Page>
  );
};

export default NewPage;
