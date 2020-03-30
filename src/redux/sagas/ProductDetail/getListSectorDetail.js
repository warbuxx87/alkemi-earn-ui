import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_SECTOR_DETAIL_REDUCER,
    GET_LIST_SECTOR_DETAIL_REQUEST,
} from './node_modules/redux/reducers/SectorDetail/actionTypes';
import { getListSectorDetailAPI } from './node_modules/services/productDetail/getListSectorDetail';

function* requestGetListSectorDetail() {
    try {
        const listSector = yield call(getListSectorDetailAPI);
        yield put({
          type: GET_LIST_SECTOR_DETAIL_REDUCER,
          sector_data : listSector
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* listSectorDetail() {
  yield takeLatest(GET_LIST_SECTOR_DETAIL_REQUEST, requestGetListSectorDetail);
}

export default listSectorDetail;
