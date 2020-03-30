import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_USER_REDUCER,
    GET_LIST_USER_REQUEST
} from '../../reducers/User/actionTypes';
import { getListUser } from '../../../services/user/getListUser';

function* requestGetListUser() {
  try {
    const listUser = yield call(getListUser);
    yield put({
      type: GET_LIST_USER_REDUCER,
      listUser : listUser
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListUser() {
  yield takeLatest(GET_LIST_USER_REQUEST, requestGetListUser);
}

export default ListUser;
