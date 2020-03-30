import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_DATA_ANALYSIS_REDUCER,
  GET_LIST_DATA_ANALYSIS_REQUEST,
  SET_STATUS_LOADING
} from '../../reducers/Data/ActionType';
import { getListData } from '../../../services/data/getListData';

function* requestGetListUser(data) {
  try {
    yield put({
      type: SET_STATUS_LOADING,
      showLoading : true
    });
    const ListData = yield call(getListData, data.data);
    let newData = {};
    ListData.data.products.map((item)=>{
      var array = item.name.split(",");
      let type = array[array.length-1].trim();
      if(!newData[type]) {
        newData[type] = [item];
      }
      else {
        newData[type].push(item);
      }
    })
    //   Object.keys(newData).map(function(key, index) {
    //     title = key;
    //     dataAnalysis = newData[key];
    // });
    yield put({
      type: GET_LIST_DATA_ANALYSIS_REDUCER,
      listData : newData
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListDataAnalysis() {
  yield takeLatest(GET_LIST_DATA_ANALYSIS_REQUEST, requestGetListUser);
}

export default ListDataAnalysis;
