import React, {
    FunctionComponent,
    useCallback,
    useEffect,
    useState,
} from 'react';
import {
    Card,
    Col, DatePicker,
    Form,
    Input,
    InputNumber,
    Row,
    Select,
    Typography
} from "antd";
import { FormListFieldData } from 'antd/lib/form/FormList';
import { FormInstance } from 'antd/es/form';
import EventEmitter, { EventKeys } from '../services/EventEmitter';
import { FormInvoiceLine } from '../services/Calculator';
import { vatCategoryCode } from '../lib/x-invoice/constants';

const style = {
    datePicker: {
        width: '100%',
    },
    card: {
        backgroundColor: '#fafafa',
        marginBottom: '10px',
    },
    input: {
        width: '100%',
    },
    width: '60%',
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
                    <Form.Item
                        fieldKey={[
                            field.fieldKey,
                            'Item.SellersItemIdentification.ID',
                        ]}
                        name={[field.name, 'Item.SellersItemIdentification.ID']}
                        label="Artiklnr."
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={3}>
                    <Form.Item
                        {...field}
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
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
                <Col span={5}>
                    <Form.Item
                        required
                        label="Einheit"
                        fieldKey={[field.fieldKey, 'InvoicedQuantity@unitCode']}
                        name={[field.name, 'InvoicedQuantity@unitCode']}
                    >
                        <Select style={style.input} placeholder="Einheit">
                            <Select.Option value="LH">
                                Arbeitsstunde
                            </Select.Option>
                            <Select.Option value="DAY">Tag</Select.Option>
                            <Select.Option value="EC">Stück</Select.Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={13}>
                    <Form.Item
                        {...field}
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
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
                <Col span={6}>
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
                <Col span={6}>
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
                        fieldKey={[
                            field.fieldKey,
                            'Item.ClassifiedTaxCategory.Percent',
                        ]}
                        name={[
                            field.name,
                            'Item.ClassifiedTaxCategory.Percent',
                        ]}
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
                <Col span={6}>
                    <Form.Item
                        {...field}
                        required
                        fieldKey={[
                            field.fieldKey,
                            'Item.ClassifiedTaxCategory.ID',
                        ]}
                        name={[field.name, 'Item.ClassifiedTaxCategory.ID']}
                        tooltip='Der Code der für den in Rechnung gestellten Posten geltenden Umsatzsteuerkategorie. Für die gängige Umsatzsteuer sollte "Standard Rate" gewählt werden. Die zugrundeliegende genormte Liste ist momentan nur in englischer Sprache verfügbar.'
                        label="Umsatzsteuerkategorie"
                    >
                        <Select
                            style={style.input}
                            placeholder="Umsatzsteuerkategorie auswählen"
                        >
                            {Object.entries(vatCategoryCode).map(
                                ([value, readableName]) => (
                                    <Select.Option key={value} value={value}>
                                        {readableName}
                                    </Select.Option>
                                )
                            )}
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item label="Gesamtsumme netto">
                        <Input value={total || 0} style={style.input} disabled />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={8}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        fieldKey={[
                            field.fieldKey,
                            'OrderLineReference.LineID',
                        ]}
                        name={[
                            field.name,
                            'OrderLineReference.LineID',
                        ]}
                        label="Bestell-Referenz"
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        tooltip="Das Datum, an dem der Rechnungszeitraum beginnt. (BT-73)"
                        fieldKey={[
                            field.fieldKey,
                            'InvoicePeriod.StartDate',
                        ]}
                        name={[
                            field.name,
                            'InvoicePeriod.StartDate',
                        ]}
                        label="Abrechnungszeitraum vom"
                    >
                        <DatePicker
                            placeholder="Datum auswählen"
                            style={style.datePicker}
                        />
                    </Form.Item>
                </Col>
                <Col span={8}>
                    <Form.Item
                        required
                        rules={[
                            {
                                required: true,
                                message: 'Dieses Feld muss ausgefüllt werden',
                            },
                        ]}
                        fieldKey={[
                            field.fieldKey,
                            'InvoicePeriod.EndDate',
                        ]}
                        name={[
                            field.name,
                            'InvoicePeriod.EndDate',
                        ]}
                        tooltip="Das Datum, an dem der Rechnungszeitraum endet. (BT-74)"
                        label="Abrechnungszeitraum bis"
                    >
                        <DatePicker
                            placeholder="Datum auswählen"
                            style={style.datePicker}
                        />
                    </Form.Item>
                </Col>
            </Row>
        </Card>
    );
};

export default ItemCard;
