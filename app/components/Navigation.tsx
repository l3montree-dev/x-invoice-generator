import React, { FunctionComponent } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router';

const Navigation: FunctionComponent = () => {
  const history = useHistory();
  console.log(window.location);
  return (
    <Menu defaultSelectedKeys={['new']} mode="inline">
      <Menu.Item onClick={() => history.replace('/')} key="new">
        Neue Rechnung
      </Menu.Item>
      <Menu.Item onClick={() => history.replace('open')} key="open">
        Rechnung öffnen
      </Menu.Item>
      <Menu.Item onClick={() => history.replace('settings')} key="settings">
        Einstellungen
      </Menu.Item>
    </Menu>
  );
};

export default Navigation;
