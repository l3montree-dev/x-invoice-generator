import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { DraggerProps } from 'antd/lib/upload/Dragger';
import { RcCustomRequestOptions } from 'antd/es/upload/interface';
import { readFileSync } from 'fs';
import Transformer from '../../services/Transformer';
import XInvoice from '../../lib/x-invoice/XInvoice';

const props: DraggerProps = {
  name: 'file',
  multiple: false,
  accept: 'text/xml',
  customRequest: async (file: RcCustomRequestOptions) => {
    console.log(file);
    console.log(
      Transformer.invoice2Object(
        await XInvoice.fromXML(readFileSync(file.file.path).toString())
      )
    );
    file.onSuccess({}, file.file);
    return 'test';
  },
};

const Import = () => {
  return (
    <div>
      <Upload.Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Ziehe eine XML Datei in diesen Bereich oder klicke, um die Datei
          auszuwählen
        </p>
      </Upload.Dragger>
    </div>
  );
};

export default Import;
