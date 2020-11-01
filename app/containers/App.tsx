import React, { ReactNode } from 'react';
import 'antd/dist/antd.css';

type Props = {
  children: ReactNode;
};

export default function App(props: Props) {
  const { children } = props;
  return <>{children}</>;
}
