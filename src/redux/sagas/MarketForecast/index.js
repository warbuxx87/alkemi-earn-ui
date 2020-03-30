import { all } from 'redux-saga/effects';
import listMarketForecast from './getListMarketForecast';
import setDataMarket from './setDataMarketForecast';

export const marketForecastSagas = function* root() {
  yield all([
    listMarketForecast(),
    setDataMarket(),
  ]);
};
  