import React, { FunctionComponent } from 'react';
import { Button, Collapse, Form, message } from 'antd';
import { FormInstance } from 'antd/lib/form/hooks/useForm';
import { PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { Invoice } from '../../lib/x-invoice/types';
import ItemCard from '../../components/ItemCard';
import GeneralInformation from '../../components/GeneralInformation';
import SellerInformation from '../../components/SellerInformation';
import SalesTaxBreakdown from '../../components/SalesTaxBreakdown';
import Totals from '../../components/Totals';
import PaymentDetails from '../../components/PaymentDetails';
import BuyerInformation from '../../components/BuyerInformation';
import PersistentStorage from '../../services/PersistentStorage';
import { AppDispatch, CombinedState } from '../../redux/rootReducer';
import Transformer from '../../services/Transformer';

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
  const dispatch: AppDispatch = useDispatch();
  const initialFormData = useSelector(
    (state: CombinedState) => state.form.initialFormData
  );
  if (initialFormData) {
    dispatch({ type: 'RESET_INITIAL_DATA' });
  }
  const handleFinishFailed = () => {
    message.error('Nicht alle Felder wurden korrekt ausgefüllt');
  };
  return (
    <div>
      <h2>Neue Rechnung erstellen</h2>
      <Form
        onFinishFailed={handleFinishFailed}
        initialValues={
          initialFormData
            ? Transformer.invoice2Object(initialFormData)
            : PersistentStorage.getInstance().get('formData')
        }
        onFinish={props.onSubmit}
        form={props.formHandler}
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
                      formHandler={props.formHandler}
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
          <Collapse.Panel
            forceRender
            key="5"
            header="Umsatzsteueraufschlüsselung"
          >
            <SalesTaxBreakdown formHandler={props.formHandler} />
          </Collapse.Panel>
          <Collapse.Panel forceRender key="6" header="Summen">
            <Totals formHandler={props.formHandler} />
          </Collapse.Panel>
          <Collapse.Panel forceRender key="7" header="Zahlungsinformationen">
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
