import React, { FunctionComponent, useState } from 'react';
import { Col, PageHeader, Row } from 'antd';
import NewPage from './NewPage';
import ImportPage from './ImportPage';
import SettingsPage from './SettingsPage';
import Navigation from '../components/Navigation';

const translateActiveKey = (key: string) => {
  switch (key) {
    case 'settings':
      return 'Einstellungen';
    case 'open':
      return 'Rechnung öffnen';
    default:
      return 'Neue Rechnung';
  }
};
const App: FunctionComponent = () => {
  const [activeKey, setActiveKey] = useState('new');
  return (
    <>
      <PageHeader
        subTitle={translateActiveKey(activeKey)}
        className="site-page-header"
        title="X-Rechnungs Generator"
      />
      <Row>
        <Col className="menu-container" flex="256px">
          <Navigation activeKey={activeKey} onActiveKeyChange={setActiveKey} />
          <div className="notes">
            <small>
              GPL-3.0-only (Open Source)
              <br />
              Picked from
              <b> l3montree</b>
            </small>
          </div>
        </Col>
        <Col className="main" flex="auto">
          {/* eslint-disable-next-line no-nested-ternary */}
          {activeKey === 'new' ? (
            <NewPage />
          ) : activeKey === 'open' ? (
            <ImportPage />
          ) : (
            <SettingsPage />
          )}
        </Col>
      </Row>
    </>
  );
};

export default App;
