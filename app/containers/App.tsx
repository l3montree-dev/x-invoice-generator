import React, { FunctionComponent } from 'react';
import { Col, Row } from 'antd';
import { Switch, Route } from 'react-router-dom';
import NewPage from './NewPage';
import ValidatePage from './ValidatePage';
import SettingsPage from './SettingsPage';
import Navigation from '../components/Navigation';

const App: FunctionComponent = () => {
  return (
    <>
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
        <Col className="wrapper" flex="auto">
          <Switch>
            <Route exact component={NewPage} path="/" />
            <Route path="/open" component={ValidatePage} />
            <Route path="/settings" component={SettingsPage} />
          </Switch>
        </Col>
      </Row>
    </>
  );
};

export default App;
