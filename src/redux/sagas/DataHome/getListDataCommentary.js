import { call, select, takeEvery, put } from 'redux-saga/effects';
import {
    GET_COMMENTARY_HOME_REQUEST,
    GET_LIST_COMMENTARY_HOME_REDUCER
} from '../../reducers/DataHome/ActionType';
import {
  getListLatestAlertAPI,
  getListMarketData
} from '../../../services/dataHome';

function* requestGetListDataCommentary(action) {
  const params = {
    country: "all",
    page: 1,
    filter: action.payload.id,
    user_country: "all"
  }
  const data = yield call(getListLatestAlertAPI, params);
  if(data.data.length){
    const islogin = yield select(state => state.User.islogin);
    let newData = [];
    yield* data.data.map(function* (journalItem, key) {
      if(key < 3) {
        if(islogin){
          const marketData = yield call(getListMarketData, {
            sector: action.payload.id,
            country: journalItem.country_id,
            position: 0,
            user_country: "all"
          })
          if(marketData.data.products.length){
            journalItem.market_data =  marketData.data.products[Math.floor(Math.random() * marketData.data.products.length-1)]
          }
        }
        newData.push(journalItem);
      }
    });
    action.payload.data = newData;
    yield put({
      type: GET_LIST_COMMENTARY_HOME_REDUCER,
      payload : action.payload
    });
  }
}

function* getListDataCommentary() {
  yield takeEvery(GET_COMMENTARY_HOME_REQUEST, requestGetListDataCommentary);
}

export default getListDataCommentary;


