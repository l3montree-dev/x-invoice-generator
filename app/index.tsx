import React, { Fragment } from 'react';
import { render } from 'react-dom';
import { AppContainer as ReactHotAppContainer } from 'react-hot-loader';
import './theme.global.less';
import './app.global.scss';


const AppContainer = process.env.PLAIN_HMR ? Fragment : ReactHotAppContainer;

document.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line global-require
    const Root = require('./containers/Root').default;
    render(
        <AppContainer>
            <Root history={history} />
        </AppContainer>,
        document.getElementById('root')
    );
});
