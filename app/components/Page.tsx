import React, { FunctionComponent, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Page: FunctionComponent<Props> = (props) => {
  const { children } = props;
  return <div className="page">{children}</div>;
};

export default Page;
