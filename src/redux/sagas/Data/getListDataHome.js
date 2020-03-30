import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_DATA_HOME_REDUCER,
    GET_LIST_DATA_HOME_REQUEST
} from '../../reducers/Data/ActionType';
import { getListData } from '../../../services/data/getListData';

function* requestGetListUser(data) {
  try {
    const ListData = yield call(getListData, data.payload);
    yield put({
        type: GET_LIST_DATA_HOME_REDUCER,
        listData : ListData.data
      });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListDataHome() {
  yield takeLatest(GET_LIST_DATA_HOME_REQUEST, requestGetListUser);
}

export default ListDataHome;
