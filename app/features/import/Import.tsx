import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { DraggerProps } from 'antd/lib/upload/Dragger';
import { RcCustomRequestOptions } from 'antd/es/upload/interface';

const props: DraggerProps = {
  name: 'file',
  multiple: false,
  // accept: 'text/xml',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  customRequest(info: RcCustomRequestOptions) {
    console.log(info);
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
