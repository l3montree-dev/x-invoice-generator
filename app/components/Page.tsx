import React, { FunctionComponent, ReactNode } from 'react';
import { PageHeader } from 'antd';

interface Props {
  title: string;
  children: ReactNode;
  extra?: ReactNode;
}

const Page: FunctionComponent<Props> = (props) => {
  const { children } = props;
  return (
    <div className="page">
      <PageHeader
        extra={props.extra}
        className="site-page-header"
        title={props.title}
      />
      <div className="main">{children}</div>
    </div>
  );
};

export default Page;
