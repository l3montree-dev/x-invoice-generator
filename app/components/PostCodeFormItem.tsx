import React, { FunctionComponent } from 'react';
import { Form, Input } from 'antd';

interface Props {
  name: string;
}
const PostCodeFormItem: FunctionComponent<Props> = (props) => {
  return (
    <Form.Item
      rules={[
        {
          required: true,
          pattern: /[0-9]{5}/,
          message: 'Postleitzahl muss aus mindestens 5 Zahlen bestehen',
        },
      ]}
      name={props.name}
      label="PLZ"
    >
      <Input placeholder="1234567" />
    </Form.Item>
  );
};

export default PostCodeFormItem;
