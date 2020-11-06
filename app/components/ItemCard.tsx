import React, { FunctionComponent } from 'react';
import { Card, Col, Form, Input, Row, Typography } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';

const style = {
  card: {
    backgroundColor: '#fafafa',
    marginBottom: '10px',
  },
};
interface Props {
  field: FormListFieldData;
  index: number;
  remove: () => void;
}
const ItemCard: FunctionComponent<Props> = (props) => {
  const { field, index, remove } = props;
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
          <Form.Item
            {...field}
            label="Menge"
            fieldKey={[field.fieldKey, 'InvoiceQuantity']}
            name={[field.name, 'InvoiceQuantity']}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            {...field}
            label="Bezeichnung"
            fieldKey={[field.fieldKey, 'Item.Name']}
            name={[field.name, 'Item.Name']}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col span={3}>
          <Form.Item
            {...field}
            label="Preis pro Einheit netto"
            fieldKey={[field.fieldKey, 'Price.PriceAmount']}
            name={[field.name, 'Price.PriceAmount']}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            label="Umsatzsteuer"
            fieldKey={[field.fieldKey, 'Item.ClassifiedTaxCategory.ID']}
            name={[field.name, 'Item.ClassifiedTaxCategory.ID']}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={3}>
          <Form.Item
            {...field}
            label="Gesamtsumme netto"
            fieldKey={[field.fieldKey, 'LineExtensionAmount']}
            name={[field.name, 'LineExtensionAmount']}
          >
            <Input disabled />
          </Form.Item>
        </Col>
      </Row>
    </Card>
  );
};

export default ItemCard;
