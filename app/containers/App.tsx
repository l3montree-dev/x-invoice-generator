import React, { FunctionComponent } from 'react';
import { Tabs } from 'antd';
import NewPage from './NewPage';
import ImportPage from './ImportPage';
import SettingsPage from './SettingsPage';

const App: FunctionComponent = () => {
  return (
    <>
      <Tabs>
        <Tabs.TabPane key={1} tab="Neue Rechnung">
          <NewPage />
        </Tabs.TabPane>
        <Tabs.TabPane key={2} tab="Rechnung importieren">
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
