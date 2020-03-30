import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_LOGIN_REDUCER,
    GET_PROFILE_REQUEST,
    TOKEN_EXPIRED_REQUEST
} from '../../reducers/User/actionTypes';
import { getProfileUser } from '../../../services/user/getProfileUser';

function* requestGetProfileUser() {
  try {
    if(!localStorage.getItem('token')) return;
    const userLogin = yield call(getProfileUser);
    yield put({
      type: USER_LOGIN_REDUCER,
      user_login : userLogin.data
    });
  } catch (error) {
    yield put({
        type: TOKEN_EXPIRED_REQUEST
      });
    return Promise.reject(error);
  }
}

function* ProfileUser() {
  yield takeLatest(GET_PROFILE_REQUEST, requestGetProfileUser);
}

export default ProfileUser;