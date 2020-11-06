import React, { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

const Div = styled.div``;
const Page: FunctionComponent<Props> = (props) => {
  const { children } = props;
  return <Div className="page">{children}</Div>;
};

export default Page;
