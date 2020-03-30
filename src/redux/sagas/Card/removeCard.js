import { call, put, takeLatest } from 'redux-saga/effects';
import {
  REMOVE_CARD_REQUEST,
  REMOVE_CARD_FAIL,
  GET_LIST_CARD_REQUEST
} from '../../reducers/Card/ActionType';
import { removeCard } from '../../../services/card/removeCard';

function* requestRemoveCard(action) {
	yield put({
    type: REMOVE_CARD_FAIL,
    error: {
      isError: false,
      message: '',
  		isLoad: true
    }
	})
  try {
    const result = yield call(removeCard, action.id);
    yield put({
	    type: REMOVE_CARD_FAIL,
	    error: {
	      isError: false,
	      message: '',
	  		isLoad: false
	    }
		})
		yield put({
	    type: GET_LIST_CARD_REQUEST
  	})
  } catch (error) {
  	yield put({
      type: REMOVE_CARD_FAIL,
      error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : '',
        isLoad: false
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
    return Promise.reject(error);
  }
}

function* removeCardPayment() {
  yield takeLatest(REMOVE_CARD_REQUEST, requestRemoveCard);
}

export default removeCardPayment;
