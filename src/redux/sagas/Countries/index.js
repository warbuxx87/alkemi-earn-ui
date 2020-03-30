import { all } from 'redux-saga/effects';
import getListCountries from './getListCountries';
import getListCountriesMarketData from './getListCountriesMarketData';
import getListCountriesMarketForecast from './getListCountriesMarketForecast';

export const countriesSagas = function* root() {
  yield all([getListCountries(), getListCountriesMarketData(), getListCountriesMarketForecast()]);
};
