import {
  call,
  put,
  takeLatest
} from 'redux-saga/effects';
import {
  USER_UPDATE_PROFILE_REDUCER,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_SENDOTP
} from '../../reducers/User/actionTypes';
import {
  updateProfileUser
} from '../../../services/user/updateProfileUser';

function* requestupdateProfile(action) {
  try {
    const result = yield call(updateProfileUser, action.payload);
    if (result.data.is_profile_updated) {
      yield put({
        type: USER_UPDATE_PROFILE_REDUCER,
        user: result.data.user,
      });
      localStorage.setItem('user', JSON.stringify(result.data.user))
    } else {
      yield put({
        type: USER_UPDATE_PROFILE_SENDOTP,
        OTP: {
          verify_otp: true,
          country_code: result.data.country_code,
          phone_number: result.data.phone_number,
          formData: action.payload
        }
      });
    }
  } catch (error) {
    if (error.response.data.error && error.response.data.errors.length) {
      yield put({
        type: USER_UPDATE_PROFILE_FAIL,
        error: {
          isError: true,
          message: error.response.data.errors[0].errorMessage,
        }
      });
    }
    return Promise.reject(error);
  }
}

function* updateProfile() {
  yield takeLatest(USER_UPDATE_PROFILE_REQUEST, requestupdateProfile);
}

export default updateProfile;