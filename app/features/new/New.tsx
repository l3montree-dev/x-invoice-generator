import React, { FunctionComponent } from 'react';
import { Button, Collapse, Form } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { PlusOutlined } from '@ant-design/icons';
import { Invoice } from '../../lib/x-invoice/types';
import ItemCard from '../../components/ItemCard';
import GeneralInformation from '../../components/GeneralInformation';
import SellerInformation from '../../components/SellerInformation';
import SalesTaxBreakdown from '../../components/SalesTaxBreakdown';
import Totals from '../../components/Totals';
import PaymentDetails from '../../components/PaymentDetails';
import BuyerInformation from '../../components/BuyerInformation';

interface Props {
  formHandler: FormInstance<Invoice>;
  onSubmit: (invoice: Invoice) => void;
}

const style = {
  datePicker: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: '10px',
    float: 'right' as const,
  },
};

const New: FunctionComponent<Props> = (props) => {
  return (
    <div>
      <Form
        onFinish={props.onSubmit}
        form={props.formHandler}
        layout="vertical"
      >
        <Collapse defaultActiveKey={['1']}>
          <Collapse.Panel key="1" header="Allgemeine Rechnungsinformationen">
            <GeneralInformation />
          </Collapse.Panel>
          <Collapse.Panel key="2" header="Rechnungssteller">
            <SellerInformation />
          </Collapse.Panel>
          <Collapse.Panel key="3" header="Rechnungsempfänger">
            <BuyerInformation />
          </Collapse.Panel>
          <Collapse.Panel key="4" header="Rechnungselemente">
            <Form.List name="InvoiceLine">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field, index) => (
                    <ItemCard
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
          <Collapse.Panel key="5" header="Umsatzsteueraufschlüsselung">
            <SalesTaxBreakdown />
          </Collapse.Panel>
          <Collapse.Panel key="6" header="Summen">
            <Totals />
          </Collapse.Panel>
          <Collapse.Panel key="7" header="Zahlungsinformationen">
            <PaymentDetails />
          </Collapse.Panel>
        </Collapse>
        <Form.Item style={style.buttonContainer}>
          <Button type="primary" htmlType="submit">
            Exportieren
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default New;
