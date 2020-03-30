import { put, takeLatest } from 'redux-saga/effects';
import {
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_REDUCER,
} from '../../reducers/User/actionTypes';
const removeCookies = () => {
  var res = document.cookie;
  var multiple = res.split(";");
  for(var i = 0; i < multiple.length; i++) {
     var key = multiple[i].split("=");
     document.cookie = key[0]+" =; expires = Thu, 01 Jan 1970 00:00:00 UTC";
  }
}
function* requestLogoutUser() {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    removeCookies();
    document.cookie = "accept_cookie=yes";
    yield put({
      type: USER_LOGOUT_REDUCER,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* LogoutUser() {
  yield takeLatest(USER_LOGOUT_REQUEST, requestLogoutUser);
}

export default LogoutUser;