import React, { FunctionComponent } from 'react';
import { Tabs } from 'antd';
import NewPage from './NewPage';
import ImportPage from './ImportPage';
import SettingsPage from './SettingsPage';

const App: FunctionComponent = () => {
  return (
    <>
      <h1>X-Rechnungs Generator</h1>
      <h3>Picked from l3montree</h3>
      <span>Open Source (MIT Licensed)</span>
      <Tabs>
        <Tabs.TabPane key={1} tab="Neue Rechnung">
          <NewPage />
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab="Rechnung öffnen">
          <ImportPage />
        </Tabs.TabPane>
        <Tabs.TabPane key={3} tab="Einstellungen">
          <SettingsPage />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default App;
