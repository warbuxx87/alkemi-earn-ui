import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_MARKET_DATA_PUBLIC_REDUCER,
    GET_LIST_MARKET_DATA_PUBLIC_REQUEST
} from '../../reducers/Data/ActionType';
import { getListDataPublic } from '../../../services/data/getListDataPublic';

function* requestGetListMarketDataPublic(data) {
  try {
    const ListData = yield call(getListDataPublic, data.payload);
    yield put({
        type: GET_LIST_MARKET_DATA_PUBLIC_REDUCER,
        listData : ListData.data
      });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListDataHome() {
  yield takeLatest(GET_LIST_MARKET_DATA_PUBLIC_REQUEST, requestGetListMarketDataPublic);
}

export default ListDataHome;
