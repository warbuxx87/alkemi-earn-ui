import { call, put, takeLatest } from 'redux-saga/effects';
import {
  GET_LIST_CARD_REDUCER,
  GET_LIST_CARD_REQUEST,
  CREATE_CARD_FAIL,
  DEFAULT_CARD_FAIL,
  REMOVE_CARD_FAIL
} from '../../reducers/Card/ActionType';
import { getListCard } from '../../../services/card/getListCard';

function* requestGetListCard(data) {
  try {
    const ListData = yield call(getListCard);
    yield put({
      type: GET_LIST_CARD_REDUCER,
      data : ListData.data
    });
    yield put({
      type: CREATE_CARD_FAIL,
      error: {
        isError: false,
        message: '',
        isLoad: true
      }
    })
    yield put({
      type: DEFAULT_CARD_FAIL,
      error: {
        isError: false,
        message: '',
        isLoad: true
      }
    })
    yield put({
      type: REMOVE_CARD_FAIL,
      error: {
        isError: false,
        message: '',
        isLoad: true
      }
    })
  } catch (error) {
    return Promise.reject(error);
  }
}

function* listCard() {
  yield takeLatest(GET_LIST_CARD_REQUEST, requestGetListCard);
}

export default listCard;
