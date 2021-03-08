import React, { FunctionComponent } from 'react';
import { hot } from 'react-hot-loader/root';
import App from './App';
import {HashRouter as Router} from "react-router-dom";


const Root: FunctionComponent = () => (
    <Router>
        <App />
    </Router>
);

export default hot(Root);
