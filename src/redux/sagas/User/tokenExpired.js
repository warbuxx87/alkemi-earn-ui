import { put, takeLatest } from 'redux-saga/effects';
import {
    TOKEN_EXPIRED_REQUEST,
    TOKEN_EXPIRED_REDUCER,
} from '../../reducers/User/actionTypes';

function* requestTokenExpired() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    yield put({
      type: TOKEN_EXPIRED_REDUCER,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* tokenExpired() {
  yield takeLatest(TOKEN_EXPIRED_REQUEST, requestTokenExpired);
}

export default tokenExpired;