import React, { FunctionComponent } from 'react';
import { Menu } from 'antd';
import { useHistory } from 'react-router';

const Navigation: FunctionComponent = () => {
  const history = useHistory();
  return (
    <div>
      <div className="logo-wrapper">
        <img width={30} alt="Logo" src={`${__dirname}/../resources/icon.png`} />{' '}
        <h3>- Rechnung Generator</h3>
      </div>
      <Menu defaultSelectedKeys={['new']} mode="inline">
        <Menu.Item onClick={() => history.replace('/')} key="new">
          Neue Rechnung
        </Menu.Item>
        <Menu.Item onClick={() => history.replace('open')} key="open">
          Rechnung überprüfen
        </Menu.Item>
        <Menu.Item onClick={() => history.replace('settings')} key="settings">
          Einstellungen
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
