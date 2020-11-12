import React, { FunctionComponent } from 'react';
import { Form } from 'antd';
import Page from '../components/Page';
import XInvoice from '../lib/x-invoice/XInvoice';
import Transformer from '../services/Transformer';
import New from '../features/new/New';

const NewPage: FunctionComponent = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: object): Promise<void> => {
    // we have to transform the values, since this is flatten object.
    const xml = new XInvoice(Transformer.object2Invoice(values)).toXML();
    console.log(await XInvoice.validateXInvoice(xml));
  };

  return (
    <Page>
      <New formHandler={form} onSubmit={handleSubmit} />
    </Page>
  );
};

export default NewPage;
