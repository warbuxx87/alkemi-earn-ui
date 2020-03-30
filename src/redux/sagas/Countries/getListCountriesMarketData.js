import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_COUNTRIES_MARKET_DATA_REDUCER,
  GET_LIST_COUNTRIES_MARKET_DATA_REQUEST,
} from '../../reducers/Countries/ActionType';
import {
    GET_LIST_MARKET_DATA_REQUEST
} from '../../reducers/Data/ActionType';
import { getListCountriesBySector } from '../../../services/country/getListCountriesBySector';

function* requestGetListCountries(action) {
  try {
    const ListData = yield call(getListCountriesBySector, { sector: action.sector});

    if(ListData.data.length > 0) {
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
    }

    yield put({
      type: GET_LIST_COUNTRIES_MARKET_DATA_REDUCER,
      listData : ListData.data
    });

    let country_id = 0;
    if(ListData.data.length > 0) {
      country_id = ListData.data[0].id;
    }

    yield put({
      type: GET_LIST_MARKET_DATA_REQUEST,
      payload: {
        sector: action.sector,
        country : country_id,
        position: 0,
        user_country: "all"
      }
    });

  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCountriesBySector() {
  yield takeLatest(GET_LIST_COUNTRIES_MARKET_DATA_REQUEST, requestGetListCountries);
}

export default listCountriesBySector;
