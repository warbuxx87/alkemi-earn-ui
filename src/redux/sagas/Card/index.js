import { all } from 'redux-saga/effects';
import getCard from './getCard';
import createCard from './createCard';
import getListCard from './getListCard';
import defaultCard from './defaultCard';
import removeCard from './removeCard';

export const cardSagas= function* root() {
  yield all([getCard(), createCard(), getListCard(), defaultCard(), removeCard()]);
};
