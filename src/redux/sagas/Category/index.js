import { all } from 'redux-saga/effects';
import getListCategory from './getListCategory';
import getListCategoryMarketData from './getListCategoryMarketData';
import getListCategoryMarketForecast from './getListCategoryMarketForecast';

export const categorySagas = function* root() {
  yield all([getListCategory(), getListCategoryMarketData(), getListCategoryMarketForecast()]);
};
