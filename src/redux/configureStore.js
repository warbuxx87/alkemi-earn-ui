import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createRootReducer from './reducers';
import middlewares from './middlewares';


import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './sagas';
export const history = createBrowserHistory();
// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

export const configureStore = () => {
    const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        createRootReducer(history),
        composeEnhancer(applyMiddleware(sagaMiddleware, ...middlewares(history)))
    );
  sagaMiddleware.run(rootSaga);
  return { store };
};

export default { configureStore, history };
