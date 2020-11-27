import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Card, Col, Form, Input, InputNumber, Row, Typography } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';
import { FormInstance } from 'antd/es/form';
import EventEmitter, { EventKeys } from '../services/EventEmitter';
import { FormInvoiceLine } from '../services/Calculator';

const style = {
  card: {
    backgroundColor: '#fafafa',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
  },
};
interface Props {
  field: FormListFieldData;
  formHandler: FormInstance;
  index: number;
  remove: () => void;
}
const ItemCard: FunctionComponent<Props> = (props) => {
  const { field, index, remove } = props;

  const [total, setTotal] = useState(0);

  const handleChange = useCallback(() => {
    const formValues: FormInvoiceLine[] = props.formHandler.getFieldValue(
      'InvoiceLine'
    );
    const values = formValues[field.key];
    setTotal(
      Math.round(
        (values['Price.PriceAmount'] * values.InvoicedQuantity +
          Number.EPSILON) *
          100
      ) / 100
    );

    EventEmitter.dispatchEvent(EventKeys.PRICE_CHANGE);
  }, [field.key, props.formHandler]);

  useEffect(() => {
    handleChange();
  }, [handleChange, props.formHandler]);
  return (
    <Card
      title={`${index + 1}. Rechnungselement`}
      extra={
        <Typography.Link type="danger" onClick={remove}>
          Löschen
        </Typography.Link>
      }
      style={style.card}
      key={field.key}
    >
      <Row gutter={16}>
        <Col span={3}>
          <Form.Item name="Item.SellerItemIdentification.ID" label="Artiklnr.">
            <Input />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            label="Menge"
            fieldKey={[field.fieldKey, 'InvoicedQuantity']}
            name={[field.name, 'InvoicedQuantity']}
          >
            <InputNumber
              onChange={handleChange}
              precision={6}
              step={0.25}
              style={style.input}
            />
          </Form.Item>
        </Col>
        <Col span={18}>
          <Form.Item
            {...field}
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            label="Bezeichnung"
            fieldKey={[field.fieldKey, 'Item.Name']}
            name={[field.name, 'Item.Name']}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            {...field}
            required
            rules={[
              {
                required: true,
                message: 'Dieses Feld muss ausgefüllt werden',
              },
            ]}
            label="Preis pro Einheit netto"
            fieldKey={[field.fieldKey, 'Price.PriceAmount']}
            name={[field.name, 'Price.PriceAmount']}
          >
            <InputNumber
              onChange={handleChange}
              style={style.input}
              precision={2}
              step={0.01}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            {...field}
            required
            rules={[
              {
                required: true,
                message: 'Dieses Feld muss ausgefüllt werden',
              },
            ]}
            label="Umsatzsteuer"
            fieldKey={[field.fieldKey, 'Item.ClassifiedTaxCategory.Percent']}
            name={[field.name, 'Item.ClassifiedTaxCategory.Percent']}
          >
            <InputNumber
              style={style.input}
              placeholder="19"
              onChange={handleChange}
              precision={1}
              step={0.5}
              max={25}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item label="Gesamtsumme netto">
            <Input value={total} style={style.input} disabled />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemCard;
