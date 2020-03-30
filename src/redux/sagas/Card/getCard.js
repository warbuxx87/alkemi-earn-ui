import { put, takeLatest } from 'redux-saga/effects';
import {
  GET_CARD_REDUCER,
  SET_CARD_REQUEST
} from '../../reducers/Card/ActionType';

function* requestGetCard(data) {
  try {
    yield put({
      type: GET_CARD_REDUCER,
      data : data.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* cardPayment() {
  yield takeLatest(SET_CARD_REQUEST, requestGetCard);
}

export default cardPayment;
