import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_COMMENTARY_HOME_REQUEST,
    GET_LIST_COMMENTARY_HOME_REDUCER,
    RESET_LIST_COMMENTARY_HOME_REDUCER
} from '../../reducers/DataHome/ActionType';
import axios from '../../../services/configApi';
import {
  getListLatestAlertAPI
} from '../../../services/dataHome';

const locale = 'en';

const getListSectorAPI = async () => {
    try {
      const result = await axios(`api/${locale}/data-search/sector`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            'USER-TOKEN' : ''
          },
        })

      return result.data;
    } catch (error) {
      return Promise.reject(error);
    }
};

function* requestGetListData() {
  try {
    yield put({
      type: RESET_LIST_COMMENTARY_HOME_REDUCER,
    });
    const data = yield call(getListSectorAPI);
    yield* data.data.map(function* (journalItem) {
      const Latest = yield call(getListLatestAlertAPI,{
        country: "all",
        page: 1,
        filter: journalItem.id,
        user_country: "all"
      })
      if(Latest.data&&Latest.data.length){
        journalItem.data = Latest.data.slice(0,3);
        yield put({
          type: GET_LIST_COMMENTARY_HOME_REDUCER,
          payload : journalItem
        });
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* getListData() {
  yield takeLatest(GET_LIST_COMMENTARY_HOME_REQUEST, requestGetListData);
}

export default getListData;
