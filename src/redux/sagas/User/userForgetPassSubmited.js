import { call, put, takeLatest } from 'redux-saga/effects';
import {
    USER_FORGET_PASSWORD_SUBMITED,
    USER_FORGET_PASSWORD_SUBMITED_FAIL,
    USER_FORGET_PASSWORD_SUBMITED_REQUEST
} from '../../reducers/User/actionTypes';
import {forgetPassSubmited} from '../../../services/user/forgetPassSubmited'

function* requestUserForgetPassSubmited(data) {
  yield put({
    type:USER_FORGET_PASSWORD_SUBMITED_FAIL,
    user_forget_submited_error:{
      isError: false,
      message: ''
    }
  })
  try {
    const user_forget_pass_submited = yield call(forgetPassSubmited, data.data);
    yield put({
      type: USER_FORGET_PASSWORD_SUBMITED,
      user_forget_password_submited: user_forget_pass_submited,
    });
  } catch (error) {
    yield put({
      type:USER_FORGET_PASSWORD_SUBMITED_FAIL,
      user_forget_submited_error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : ''
      }
    })
    return Promise.reject(error);
  }
}

function* user_forget_pass_submited() {
  yield takeLatest(USER_FORGET_PASSWORD_SUBMITED_REQUEST, requestUserForgetPassSubmited);
}

export default user_forget_pass_submited;
