import { all } from 'redux-saga/effects';
import getListData from './getListData';
import getListDataCommentary from './getListDataCommentary'

export const dataHomeSagas = function* root() {
  yield all([getListData(),getListDataCommentary()]);
};
