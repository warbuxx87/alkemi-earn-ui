import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_CATEGORY_MARKET_DATA_REDUCER,
  GET_LIST_CATEGORY_MARKET_DATA_REQUEST
} from '../../reducers/Category/ActionType';
import {
  GET_LIST_COUNTRIES_MARKET_DATA_REQUEST
} from '../../reducers/Countries/ActionType';
import { getListCategoryAPI } from '../../../services/category/getListCategory';

function* requestGetListCategory() {
  try {
    const ListData = yield call(getListCategoryAPI);
    yield put({
      type: GET_LIST_CATEGORY_MARKET_DATA_REDUCER,
      listData : ListData.data
    });
    if(ListData.data.length > 0) {
      yield put({
        type: GET_LIST_COUNTRIES_MARKET_DATA_REQUEST,
        sector : ListData.data[0].id
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCategoryMarketData() {
  yield takeLatest(GET_LIST_CATEGORY_MARKET_DATA_REQUEST, requestGetListCategory);
}

export default listCategoryMarketData;
