import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_RESET_PASSWORD_REDUCER,
    USER_RESET_PASSWORD_FAIL,
    USER_RESET_PASSWORD_REQUEST,
} from '../../reducers/User/actionTypes';
import  {resetPassword}  from '../../../services/user/resetPassword';

function* requestUserResetPassword(action) {
  yield put({
    type:USER_RESET_PASSWORD_FAIL,
    user_reset_password_error:{
      isError: false,
      message: ''
    }
  })
  try {
    const user_reset_pass = yield call(resetPassword, action.data);
    yield put({
      type: USER_RESET_PASSWORD_REDUCER,
      user_reset_password: user_reset_pass,
    //   info_number: user_reset_pass.data
    });
  } catch (error) {
    yield put({
      type:USER_RESET_PASSWORD_FAIL,
        user_reset_password_error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* user_reset_password() {
  yield takeLatest(USER_RESET_PASSWORD_REQUEST, requestUserResetPassword);
}

export default user_reset_password;
