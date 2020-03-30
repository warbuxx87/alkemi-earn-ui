import { all } from 'redux-saga/effects';
import getListDataHome from './getListDataHome';
import getListMarketData from './getListMarketData';
import getListDataAnalysis from './getListDataAnalysis';
import getListDataHomePublic from './getListDataHomePublic';

export const dataSagas = function* root() {
  yield all([getListDataHome(), getListMarketData(), getListDataAnalysis(), getListDataHomePublic()]);
};
