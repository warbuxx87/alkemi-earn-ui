import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { AppContainer } from 'react-hot-loader';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { configureStore, history } from './redux/configureStore';
import './asset/scss/style.scss';
import APIInstance from './services/configApi';
import { TOKEN_EXPIRED_REQUEST } from './redux/reducers/User/actionTypes';

const { store } = configureStore();

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App history={history}/>
        </Provider>
    </AppContainer>
, document.getElementById('root'));
 APIInstance.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      const { response } = error;
      if (response) {
        const { status, data } = response;
        if (status === 400) {
            if(data.errors && data.errors[0].errorCode === 8015)
              store.dispatch({ type: TOKEN_EXPIRED_REQUEST });
        }
        if (status === 401) {
          // store.dispatch({ type: USER_LOGOUT_REQUEST });
      }
      }
      return Promise.reject(error);
    }
  );

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
