import React, { FunctionComponent } from 'react';
import { Form, message } from 'antd';
import { join } from 'path';
import * as electron from 'electron';
import { writeFileSync } from 'fs';
import Page from '../components/Page';
import XInvoice from '../lib/x-invoice/XInvoice';
import Transformer from '../services/Transformer';
import New from '../features/new/New';

const NewPage: FunctionComponent = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: object): Promise<void> => {
    // we have to transform the values, since this is flatten object.
    const invoice = Transformer.object2Invoice(values);
    const xml = new XInvoice(invoice).toXML();
    const isValid = await XInvoice.validateXInvoice(
      xml,
      join(__dirname, 'lib', 'x-invoice')
    );
    if (!isValid) {
      message.error(
        'Die generierte Rechnung entspricht nicht dem X-Rechnung Standard'
      );
      return;
    }
    const savePath = await electron.remote.dialog.showSaveDialog({
      defaultPath: `${electron.remote.app.getPath('documents')}/Rechnung_${
        invoice.ID
      }.xml`,
    });
    if (savePath.filePath) {
      writeFileSync(savePath.filePath, xml);
      message.success('Rechnung erfolgreich gespeichert');
    }
  };

  return (
    <Page>
      <New formHandler={form} onSubmit={handleSubmit} />
    </Page>
  );
};

export default NewPage;
