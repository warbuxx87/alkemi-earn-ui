import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER,
  SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REQUEST
} from '../../reducers/SubscriptionPlan/ActionType';
import { setAutoRenewSubscriptionAPI } from '../../../services/subscriptionPlan/setAutoRenewSubscription';

function* requestSetAutoRenewSubscription(data) {
  try {
    yield call(setAutoRenewSubscriptionAPI, data.data);
    yield put({
      	type: SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER,
      	error: {
      		isError: false,
        	message: '',
        	isLoad: false
      	}
    });
  } catch (error) {
  	yield put({
      	type: SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER,
      	error: {
      		isError: error.response.data.error,
        	message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : '',
        	isLoad: false,
      	}
    });
    yield put({
      	type: SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER,
      	error: {
      		isError: false,
        	message: '',
        	isLoad: true
      	}
    });
    return Promise.reject(error);
  }
}

function* listSubscription() {
  yield takeLatest(SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REQUEST, requestSetAutoRenewSubscription);
}

export default listSubscription;
