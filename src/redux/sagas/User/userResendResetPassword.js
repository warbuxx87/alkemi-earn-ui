import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_RESEND_RESET_PASSWORD_REQUEST,
    USER_RESEND_RESET_PASSWORD_REDUCER,
    USER_RESEND_RESET_PASSWORD_FAIL
} from '../../reducers/User/actionTypes';
import  {resendResetPassword}  from '../../../services/user/resendResetPassword';

function* requestUserResendResetPassword(action) {
  yield put({
    type:USER_RESEND_RESET_PASSWORD_FAIL,
    resend_reset_password_error:{
      isError: false,
      message: ''
    }
  })
  try {
    const user_reset_pass = yield call(resendResetPassword, action.data);
    yield put({
      type: USER_RESEND_RESET_PASSWORD_REDUCER,
    });
  } catch (error) {
    yield put({
      type:USER_RESEND_RESET_PASSWORD_FAIL,
      resend_reset_password_error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* ResendResetPassword() {
  yield takeLatest(USER_RESEND_RESET_PASSWORD_REQUEST, requestUserResendResetPassword);
}

export default ResendResetPassword;
