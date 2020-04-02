import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';
import './assets/scss/style.scss';


ReactDOM.render(
    <AppContainer>
            <App />
    </AppContainer>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
