import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload } from 'antd';
import { RcCustomRequestOptions } from 'antd/es/upload/interface';
import { readFileSync } from 'fs';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import XInvoice from '../../lib/x-invoice/XInvoice';
import { AppDispatch } from '../../redux/rootReducer';

const Import = () => {
  const history = useHistory();
  const dispatch: AppDispatch = useDispatch();
  const customRequest = async (file: RcCustomRequestOptions) => {
    const formData = await XInvoice.fromXML(
      readFileSync(file.file.path).toString()
    );

    file.onSuccess({}, file.file);
    dispatch({
      type: 'SET_INITIAL_DATA',
      payload: { initialFormData: formData },
    });
    history.replace(`/`, { formData });
  };
  return (
    <div>
      <h2>Rechnung öffnen</h2>
      <Upload.Dragger
        name="file"
        multiple={false}
        accept="text/xml"
        customRequest={customRequest}
      >
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
