import React, { FunctionComponent } from 'react';
import { Menu } from 'antd';

interface Props {
  activeKey: string;
  onActiveKeyChange: (key: string) => void;
}
const Navigation: FunctionComponent<Props> = (props) => {
  return (
    <Menu
      onClick={(el) => props.onActiveKeyChange(el.key as string)}
      defaultSelectedKeys={['new']}
      mode="inline"
    >
      <Menu.Item key="new">Neue Rechnung</Menu.Item>
      <Menu.Item key="open">Rechnung öffnen</Menu.Item>
      <Menu.Item key="settings">Einstellungen</Menu.Item>
    </Menu>
  );
};

export default Navigation;
