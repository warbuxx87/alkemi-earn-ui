import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_DATA_FILE_REPORT_REDUCER,
    GET_DATA_FILE_REPORT_REQUEST
} from '../../reducers/SectorDetail/actionTypes';
import { getFileReport } from '../../../services/SectorDetail/getFileReport';


function* requestGetFileReport(action) {
    try {
        const res = yield call(getFileReport,action.data);
        yield put({
            type            : GET_DATA_FILE_REPORT_REDUCER,
            fileReport    : res.data
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getDataFileReport() {
  yield takeLatest(GET_DATA_FILE_REPORT_REQUEST, requestGetFileReport);
}

export default getDataFileReport;
