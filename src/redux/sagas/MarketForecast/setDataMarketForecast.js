import { put, takeLatest } from 'redux-saga/effects';
import {
  SET_PRODUCT_AND_COUNTRY_REDUCER,
  SET_PRODUCT_AND_COUNTRY_REQUEST
} from '../../reducers/MarketForecast/ActionType';

function* requestSetDataMarketForecast(data) {
  try {
    yield put({
      type: SET_PRODUCT_AND_COUNTRY_REDUCER,
      listData: {
        ...data.dataId,
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* SetDataMarket() {
  yield takeLatest(SET_PRODUCT_AND_COUNTRY_REQUEST, requestSetDataMarketForecast);
}

export default SetDataMarket;
