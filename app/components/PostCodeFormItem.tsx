import React, { FunctionComponent } from 'react';
import { Form, Input } from 'antd';

interface Props {
    name: string;
    required: boolean;
}
const PostCodeFormItem: FunctionComponent<Props> = (props) => {
    return (
        <Form.Item
            rules={[
                {
                    required: props.required,
                    pattern: /[0-9]{5}/,
                    message:
                        'Postleitzahl muss aus mindestens 5 Zahlen bestehen',
                },
            ]}
            name={props.name}
            label="PLZ"
        >
            <Input placeholder="53127" />
        </Form.Item>
    );
};

export default PostCodeFormItem;
