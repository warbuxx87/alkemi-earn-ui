import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_CATEGORY_MARKET_FORECAST_REDUCER,
  GET_LIST_CATEGORY_MARKET_FORECAST_REQUEST
} from '../../reducers/Category/ActionType';
import { getListCategoryAPI } from '../../../services/category/getListCategory';

function* requestGetListCategoryMarketForecast() {
  try {
    const ListData = yield call(getListCategoryAPI);
    yield put({
      type: GET_LIST_CATEGORY_MARKET_FORECAST_REDUCER,
      listData : ListData.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCategoryMarketForecast() {
  yield takeLatest(GET_LIST_CATEGORY_MARKET_FORECAST_REQUEST, requestGetListCategoryMarketForecast);
}

export default listCategoryMarketForecast;
