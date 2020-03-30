import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_LOGIN_REDUCER,
    USER_LOGIN_FAIL,
    USER_LOGIN_REQUEST,
    USER_LOCAL_STORAGE_REDUCER
} from '../../reducers/User/actionTypes';
import  {login}  from '../../../services/user/login';

function* requestUserLogin(data) {
  yield put({
    type:USER_LOGIN_FAIL,
    user_login_error:{
      isError: false,
      message: ''
    }
  })
  try {
    const user_login = yield call(login, data.data);
    yield put({
      type: USER_LOGIN_REDUCER,
      user_login: user_login
    });
    yield put({
      type: USER_LOCAL_STORAGE_REDUCER,
      user_storage: user_login
    });
  } catch (error) {
    yield put({
      type:USER_LOGIN_FAIL,
      user_login_error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* user_login() {
  yield takeLatest(USER_LOGIN_REQUEST, requestUserLogin);
}

export default user_login;
