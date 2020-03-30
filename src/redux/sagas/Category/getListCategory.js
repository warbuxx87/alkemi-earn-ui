import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_CATEGORY_REDUCER,
  GET_LIST_CATEGORY_REQUEST
} from '../../reducers/Category/ActionType';
import { getListCategoryAPI } from '../../../services/category/getListCategory';

function* requestGetListCategory() {
  try {
    const ListData = yield call(getListCategoryAPI);
    ListData.data.unshift( {
      id: 'all',
      title: "All",
      total: 0,
      sector_id: 'all'
    });
    yield put({
      type: GET_LIST_CATEGORY_REDUCER,
      listData : ListData.data
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCategory() {
  yield takeLatest(GET_LIST_CATEGORY_REQUEST, requestGetListCategory);
}

export default listCategory;
