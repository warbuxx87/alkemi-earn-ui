import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_DATA_AVG_PRICE_REDUCER,
    GET_DATA_AVG_PRICE_REQUEST,
} from '../../reducers/SectorDetail/actionTypes';
import { getDataAVGPrice } from '../../../services/SectorDetail/getDataAVGPrice';


function* requestGetAVGPrice(action) {
    try {
        const res = yield call(getDataAVGPrice,action.pms);
        yield put({
            type            : GET_DATA_AVG_PRICE_REDUCER,
            dataAVGPrice    : res.data
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getAVGPrice() {
  yield takeLatest(GET_DATA_AVG_PRICE_REQUEST, requestGetAVGPrice);
}

export default getAVGPrice;
