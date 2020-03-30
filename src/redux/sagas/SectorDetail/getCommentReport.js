import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_DATA_COMMENT_REDUCER,
    GET_DATA_COMMENT_REQUEST
} from '../../reducers/SectorDetail/actionTypes';
import { getCommentReport } from '../../../services/SectorDetail/getCommentReport';


function* requestGetComment(action) {
    try {
        const res = yield call(getCommentReport,action.data);
        yield put({
            type            : GET_DATA_COMMENT_REDUCER,
            commentReport    : res.data
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getDataCommentReport() {
  yield takeLatest(GET_DATA_COMMENT_REQUEST, requestGetComment);
}

export default getDataCommentReport;
