import { all } from 'redux-saga/effects';
import listMarketComm from './getListMarketComm';

export const marketCommSagas = function* root() {
  yield all([listMarketComm()]);
};
