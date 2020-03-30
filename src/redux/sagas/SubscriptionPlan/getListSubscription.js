import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_SUBSCRIPTION_PLAN_REDUCER,
  GET_SUBSCRIPTION_PLAN_REQUEST,
  SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER
} from '../../reducers/SubscriptionPlan/ActionType';
import { getListSubscriptionAPI } from '../../../services/subscriptionPlan/getListSubscription';

function* requestGetListSubscription() {
  yield put({
    type: SET_AUTO_RENEW_SUBSCRIPTION_PLAN_REDUCER,
    error: {
      isError: false,
      message: '',
      isLoad: true
    }
  });
  try {
    const ListData = yield call(getListSubscriptionAPI);
    yield put({
      type: GET_SUBSCRIPTION_PLAN_REDUCER,
      listData : ListData.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listSubscription() {
  yield takeLatest(GET_SUBSCRIPTION_PLAN_REQUEST, requestGetListSubscription);
}

export default listSubscription;
