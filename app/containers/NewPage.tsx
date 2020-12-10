import React, { FunctionComponent } from 'react';
import { Button, Collapse, Form, message } from 'antd';
import { join } from 'path';
import * as electron from 'electron';
import { readFileSync, writeFileSync } from 'fs';
import { PlusOutlined } from '@ant-design/icons';
import { remote } from 'electron';
import * as Sentry from '@sentry/electron';
import Page from '../components/Page';
import XInvoice from '../lib/x-invoice/XInvoice';
import Transformer from '../services/Transformer';
import PersistentStorage from '../services/PersistentStorage';
import GeneralInformation from '../components/GeneralInformation';
import SellerInformation from '../components/SellerInformation';
import BuyerInformation from '../components/BuyerInformation';
import ItemCard from '../components/ItemCard';
import Totals from '../components/Totals';
import PaymentDetails from '../components/PaymentDetails';
import DefaultValueProvider from '../services/DefaultValueProvider';

const NewPage: FunctionComponent = () => {
  const [form] = Form.useForm();
  const handleSubmit = async (values: object): Promise<void> => {
    // we have to transform the values, since this is flatten object.
    if ('InvoiceLine' in values) {
      try {
        const invoice = Transformer.object2Invoice({
          ...DefaultValueProvider.root,
          ...values,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          InvoiceLine: values.InvoiceLine.map(Transformer.serializeInvoiceLine),
        });
        const xml = new XInvoice(invoice).toXML();
        const isValid = await XInvoice.validateXInvoice(
          xml,
          remote.app.isPackaged
            ? join(process.resourcesPath, 'resources')
            : join(__dirname, '..', 'resources')
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
          writeFileSync(savePath.filePath, XInvoice.formatXml(xml));
          message.success('Rechnung erfolgreich gespeichert');
        }
      } catch (e) {
        message.error('Ein Fehler ist aufgetreten.');
        Sentry.captureException(e);
      }
    }
  };

  const handleFinishFailed = () => {
    message.error('Nicht alle Felder wurden korrekt ausgefüllt');
  };

  const handleOpen = async () => {
    const path = await electron.remote.dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'XML', extensions: ['xml'] }],
    });
    const [filePath] = path.filePaths;
    if (filePath) {
      const xml = readFileSync(filePath).toString();
      const obj = Transformer.invoice2Object(await XInvoice.fromXML(xml));
      form.setFieldsValue(obj);
    }
  };

  return (
    <Page
      extra={
        <Button type="primary" onClick={handleOpen}>
          Rechnung öffnen
        </Button>
      }
      title="Neue Rechnung erstellen"
    >
      <div>
        <Form
          onFinishFailed={handleFinishFailed}
          initialValues={PersistentStorage.getInstance().get('formData')}
          onFinish={handleSubmit}
          form={form}
          layout="vertical"
        >
          <Collapse bordered={false} defaultActiveKey={['1']}>
            <Collapse.Panel key="1" header="Allgemeine Rechnungsinformationen">
              <GeneralInformation />
            </Collapse.Panel>
            <Collapse.Panel forceRender key="2" header="Rechnungssteller">
              <SellerInformation requireFields />
            </Collapse.Panel>
            <Collapse.Panel forceRender key="3" header="Rechnungsempfänger">
              <BuyerInformation />
            </Collapse.Panel>
            <Collapse.Panel forceRender key="4" header="Rechnungselemente">
              <Form.List name="InvoiceLine">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map((field, index) => (
                      <ItemCard
                        formHandler={form}
                        key={field.key}
                        remove={() => remove(index)}
                        index={index}
                        field={field}
                      />
                    ))}
                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={add}
                        block
                        icon={<PlusOutlined />}
                      >
                        Element hinzufügen
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Collapse.Panel>
            <Collapse.Panel forceRender key="6" header="Summen">
              <Totals formHandler={form} />
            </Collapse.Panel>
            <Collapse.Panel forceRender key="7" header="Zahlungsinformationen">
              <PaymentDetails requireFields />
            </Collapse.Panel>
          </Collapse>
          <Form.Item className="button-container">
            <Button type="primary" htmlType="submit">
              Exportieren
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Page>
  );
};

export default NewPage;
