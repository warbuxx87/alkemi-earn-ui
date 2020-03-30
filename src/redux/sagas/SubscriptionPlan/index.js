import { all } from 'redux-saga/effects';
import getListSubscription from './getListSubscription';
import setAutoRenewSubscription from './setAutoRenewSubscription';

export const subscriptionSagas = function* root() {
  yield all([getListSubscription(), setAutoRenewSubscription()]);
};
