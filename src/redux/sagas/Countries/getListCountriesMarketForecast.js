import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_COUNTRIES_MARKET_FORECAST_REDUCER,
  GET_LIST_COUNTRIES_MARKET_FORECAST_REQUEST
} from '../../reducers/Countries/ActionType';
import { getListCountriesAPI } from '../../../services/country/getListCountries';

function* requestGetListCountriesMarketForecast() {
  try {
    const ListData = yield call(getListCountriesAPI);
    yield put({
      type: GET_LIST_COUNTRIES_MARKET_FORECAST_REDUCER,
      listData : ListData.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCountries() {
  yield takeLatest(GET_LIST_COUNTRIES_MARKET_FORECAST_REQUEST, requestGetListCountriesMarketForecast);
}

export default listCountries;
