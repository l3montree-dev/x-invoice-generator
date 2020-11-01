/* eslint react/jsx-props-no-spreading: off */
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from './constants/routes.json';
import App from './containers/App';
import ImportPage from './containers/ImportPage';
import SettingsPage from './containers/SettingsPage';
import NewPage from './containers/NewPage';

export default function Routes() {
  return (
    <App>
      <Switch>
        <Route path={routes.IMPORT} component={ImportPage} />
        <Route path={routes.SETTINGS} component={SettingsPage} />
        <Route path={routes.NEW} component={NewPage} />
      </Switch>
    </App>
  );
}
