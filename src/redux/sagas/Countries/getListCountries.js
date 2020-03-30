import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_COUNTRIES_REDUCER,
  GET_LIST_COUNTRIES_REQUEST
} from '../../reducers/Countries/ActionType';
import { getListCountriesAPI } from '../../../services/country/getListCountries';

function* requestGetListCountries() {
  try {
    const ListData = yield call(getListCountriesAPI);


    ListData.data =  ListData.data.map(item => {
      switch (item.country_code) {
        case "cn":
          item.icon_flag = `${window.location.origin}/image/cn.png`;
          return item;
        case "vn":
          item.icon_flag = `${window.location.origin}/image/vn.png`;
          return item;
        case "id":
          item.icon_flag = `${window.location.origin}/image/id.png`;
          return item;
        case "th":
          item.icon_flag = `${window.location.origin}/image/th.png`;
          return item;
        case "ph":
          item.icon_flag = `${window.location.origin}/image/ph.png`;
          return item;
        default:
          return item
          break;
      }
    })
    yield put({
      type: GET_LIST_COUNTRIES_REDUCER,
      listData : ListData.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCountries() {
  yield takeLatest(GET_LIST_COUNTRIES_REQUEST, requestGetListCountries);
}

export default listCountries;
