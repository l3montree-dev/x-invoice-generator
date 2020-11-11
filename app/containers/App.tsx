import React, { FunctionComponent } from 'react';
import { Col, PageHeader, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import NewPage from './NewPage';
import ImportPage from './ImportPage';
import SettingsPage from './SettingsPage';
import Navigation from '../components/Navigation';

const App: FunctionComponent = () => {
  return (
    <>
      <PageHeader className="site-page-header" title="X-Rechnungs Generator" />
      <Row>
        <Col className="menu-container" flex="256px">
          <Navigation />
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
          <Switch>
            <Route exact component={NewPage} path="/" />
            <Route path="/open" component={ImportPage} />
            <Route path="/settings" component={SettingsPage} />
          </Switch>
        </Col>
      </Row>
    </>
  );
};

export default App;
