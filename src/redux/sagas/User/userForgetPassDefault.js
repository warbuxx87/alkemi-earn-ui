import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_FORGET_PASSWORD_DEFAULT,
    USER_FORGET_PASSWORD_DEFAULT_FAIL,
    USER_FORGET_PASSWORD_DEFAULT_REQUEST
} from '../../reducers/User/actionTypes';
import  {forgetPassDefault}  from '../../../services/user/forgetPassDefautl';

function* requestUserForgetPassDefault(data) {
  yield put({
    type:USER_FORGET_PASSWORD_DEFAULT_FAIL,
    user_forget_default_error:{
      isError: false,
      message: ''
    }
  })
  try {
    const user_forget_pass_default = yield call(forgetPassDefault, data.data);
    yield put({
      type: USER_FORGET_PASSWORD_DEFAULT,
      user_forget_password_default: user_forget_pass_default,
      info_number: data.data
    });
  } catch (error) {
    yield put({
      type:USER_FORGET_PASSWORD_DEFAULT_FAIL,
      user_forget_default_error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* user_forget_pass_default() {
  yield takeLatest(USER_FORGET_PASSWORD_DEFAULT_REQUEST, requestUserForgetPassDefault);
}

export default user_forget_pass_default;
