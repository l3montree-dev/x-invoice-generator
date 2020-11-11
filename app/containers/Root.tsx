import React, { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader/root';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { Store } from '../store';
import App from './App';

type Props = {
  store: Store;
  history: History;
};

const Root: FunctionComponent<Props> = (props) => (
  <Provider store={props.store}>
    <ConnectedRouter history={props.history}>
      <App />
    </ConnectedRouter>
  </Provider>
);

export default hot(Root);
