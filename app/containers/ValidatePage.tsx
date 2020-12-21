import React, { useState } from 'react';
import { RcCustomRequestOptions } from 'antd/es/upload/interface';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Modal, Result, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { ICompletedValidation } from 'schematron-runner/esm/validator';
import { remote } from 'electron';
import XInvoice from '../lib/x-invoice/XInvoice';
import Page from '../components/Page';

export default function ValidatePage() {
    const [results, setResults] = useState<ICompletedValidation>();
    const [isOpen, setIsOpen] = useState(false);

    const customRequest = async (file: RcCustomRequestOptions) => {
        const res = await XInvoice.validateXInvoiceWithResults(
            readFileSync(file.file.path).toString(),
            remote.app.isPackaged
                ? join(process.resourcesPath, 'resources')
                : join(__dirname, '..', 'resources')
        );

        setResults(res);
        setIsOpen(true);
    };
    return (
        <Page title="Rechnung überprüfen">
            <div>
                <Upload.Dragger
                    name="file"
                    fileList={[]}
                    multiple={false}
                    accept="text/xml"
                    customRequest={customRequest}
                >
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                        Ziehe eine XML Datei in diesen Bereich oder klicke, um
                        die Datei auszuwählen
                    </p>
                </Upload.Dragger>
                <Modal
                    title="Ergebnisse"
                    visible={isOpen}
                    onOk={() => setIsOpen(false)}
                    onCancel={() => setIsOpen(false)}
                >
                    <Result
                        title={
                            results?.errors.length === 0
                                ? 'Rechnung ist eine valide X-Rechnung'
                                : 'Rechnung enthält Fehler'
                        }
                        status={
                            results?.errors.length === 0 ? 'success' : 'error'
                        }
                    />
                    {(results?.errors.length ?? 0) > 0 && (
                        <>
                            <h2>Fehler</h2>
                            <ul>
                                {results?.errors.map((err) => (
                                    <li key={err.assertionId}>
                                        {err.description}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {(results?.warnings.length ?? 0) > 0 && (
                        <>
                            <h2>Warnungen</h2>
                            <ul>
                                {results?.warnings.map((err) => (
                                    <li key={err.assertionId}>
                                        {err.description}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                    {(results?.passed.length ?? 0) > 0 && (
                        <>
                            <h2>Erfolgreich</h2>
                            <ul>
                                {results?.passed.map((err) => (
                                    <li key={err.assertionId}>
                                        {err.description}
                                    </li>
                                ))}
                            </ul>
                        </>
                    )}
                </Modal>
            </div>
        </Page>
    );
}
