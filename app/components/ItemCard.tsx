import React, { FunctionComponent } from 'react';
import { Card, Col, Form, Input, InputNumber, Row, Typography } from 'antd';
import { FormListFieldData } from 'antd/lib/form/FormList';

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
  index: number;
  remove: () => void;
}
const ItemCard: FunctionComponent<Props> = (props) => {
  const { field, index, remove } = props;
  return (
    <Card
      title={`${index + 1}. Rechnungselement (Nur Personenstunden)`}
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
            required
            tooltip="Eindeutige Bezeichnung für die betreffende Rechnungsposition."
            rules={[
              {
                required: true,
                pattern: /[0-9]{*}/,
                message: 'Ausschließlich Zahlen sind erlaubt',
              },
            ]}
            name="ID"
            label="Positionsnr."
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={2}>
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
            fieldKey={[field.fieldKey, 'InvoiceQuantity']}
            name={[field.name, 'InvoiceQuantity']}
          >
            <InputNumber precision={2} step={0.25} style={style.input} />
          </Form.Item>
        </Col>
        <Col span={8}>
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

        <Col span={6}>
          <Form.Item
            {...field}
            required
            rules={[
              { required: true, message: 'Dieses Feld muss ausgefüllt werden' },
            ]}
            label="Preis pro Einheit netto"
            fieldKey={[field.fieldKey, 'Price.PriceAmount']}
            name={[field.name, 'Price.PriceAmount']}
          >
            <InputNumber precision={2} step={0.01} />
          </Form.Item>
        </Col>
        <Row gutter={16}>
          <Col span={12}>
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
              fieldKey={[field.fieldKey, 'Item.ClassifiedTaxCategory.ID']}
              name={[field.name, 'Item.ClassifiedTaxCategory.ID']}
            >
              <InputNumber
                placeholder="19"
                min={16}
                precision={1}
                step={0.5}
                max={25}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
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
      </Row>
    </Card>
  );
};

export default ItemCard;