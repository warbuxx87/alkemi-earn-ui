import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_DATA_PRICE_HISTORY_REDUCER,
    GET_DATA_PRICE_HISTORY_REQUEST,
} from '../../reducers/SectorDetail/actionTypes';
import { getDataPriceHistory } from '../../../services/SectorDetail/getDataPriceHistory';


function* requestGetPriceHistory(action) {
    try {
        const res = yield call(getDataPriceHistory,action.pms);
        yield put({
            type            : GET_DATA_PRICE_HISTORY_REDUCER,
            dataPriceHistory    : res.data
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getPriceHistory() {
  yield takeLatest(GET_DATA_PRICE_HISTORY_REQUEST, requestGetPriceHistory);
}

export default getPriceHistory;
