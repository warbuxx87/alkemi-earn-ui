import { call, put, takeLatest, select } from 'redux-saga/effects';
import {
  GET_LIST_MARKET_COMM_REDUCER,
  GET_LIST_MARKET_COMM_REQUEST,
  UPDATE_IS_LOAD_MORE_MARKET_COMM
} from '../../reducers/MarketComm/ActionType';
import { getListMarketCommAPI } from '../../../services/marketComm/getListMarketComm';
import { isEmpty } from 'lodash';

function* requestGetListMarketComm(action) {
  try {

    yield put({
      type: UPDATE_IS_LOAD_MORE_MARKET_COMM,
      payload : {
        isloadMore : action.payload.page == 1 ? false : true,
        isLoad : true
      }
    });
    const {data} = yield select(state => state.MarketComm.marketComm);
    const ListData = yield call(getListMarketCommAPI, action.payload);
    yield put({
      type: GET_LIST_MARKET_COMM_REDUCER,
      listData: {
        ...action.payload,
        data: action.payload.page != 1 ? data.concat(ListData.data) : ListData.data,
        isFull : isEmpty(ListData.data)
      }
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listMarketComm() {
  yield takeLatest(GET_LIST_MARKET_COMM_REQUEST, requestGetListMarketComm);
}

export default listMarketComm;
