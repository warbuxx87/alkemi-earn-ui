import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_DATA_CHART_REDUCER,
    GET_DATA_CHART_REQUEST,
} from '../../reducers/Chart/actionTypes';
import { getDataChart } from '../../../services/SectorDetail/getChartData';
import { LOADING } from '../../reducers/SectorDetail/actionTypes';


function* requestGetDataChart(action) {
    try {
        const res = yield call(getDataChart,action.pms);
        yield put({
          type            : LOADING,
          loading       : false
        });
        yield put({
            type            : GET_DATA_CHART_REDUCER,
            dataChart       : res.data.data
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getChartData() {
  yield takeLatest(GET_DATA_CHART_REQUEST, requestGetDataChart);
}

export default getChartData;
