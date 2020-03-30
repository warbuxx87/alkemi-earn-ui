import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_LOGIN_REDUCER,
    USER_SIGN_UP_REQUEST,
    USER_SIGN_UP_FAIL
} from '../../reducers/User/actionTypes';
import  {sign_up}  from '../../../services/user/sign_up';

function* requestUserSignUp(data) {
  yield put({
    type: USER_SIGN_UP_FAIL,
    data: {
      isError: false,
      message: ''
    }
  })
  try {
    const user_sign_up = yield call(sign_up,data.data);

    localStorage.setItem('token',user_sign_up.data.token)

    localStorage.setItem('user',JSON.stringify(user_sign_up.data))

    yield put({
      type: USER_LOGIN_REDUCER,
      user_login: user_sign_up.data
    });
  } catch (error) {
    yield put({
      type: USER_SIGN_UP_FAIL,
      user_sign_up_error: {
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* user_sign_up() {
  yield takeLatest(USER_SIGN_UP_REQUEST, requestUserSignUp);
}

export default user_sign_up;
