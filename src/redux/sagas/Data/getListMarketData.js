import { call, select, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_MARKET_DATA_REDUCER,
    GET_LIST_MARKET_DATA_REQUEST,
    UPDATE_IS_LOAD_MORE_MARKET_DATA
} from '../../reducers/Data/ActionType';
import { getListData } from '../../../services/data/getListData';
import { isEmpty } from 'lodash';

function* requestGetListUser(data) {
  try {
    yield put({
      type: UPDATE_IS_LOAD_MORE_MARKET_DATA,
      payload : {
        isloadMore : data.payload.position == 0 ? false : true,
        isLoad : true
      }
    });

    const {products} = yield select(state => state.Data.markerData);
    let ListData = {
      data: {
        products: [],
        position: 0,
        total: 0
      }
    };
    if(data.payload.country != 0) {
      ListData = yield call(getListData, data.payload);
    }


    yield put({
        type: GET_LIST_MARKET_DATA_REDUCER,
        listData: {
          products: data.payload.position != 0 ? products.concat(ListData.data.products) : ListData.data.products,
          position: ListData.data.position,
          total: ListData.data.total
        },
        isFull : isEmpty(ListData.data.products),
        filter: data.payload,
        isLoadFirst: false,
        isLoad: false
      });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListDataHome() {
  yield takeLatest(GET_LIST_MARKET_DATA_REQUEST, requestGetListUser);
}

export default ListDataHome;
