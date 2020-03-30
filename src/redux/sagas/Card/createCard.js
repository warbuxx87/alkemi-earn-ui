import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SET_CARD_TOKEN_REQUEST,
  CREATE_CARD_FAIL,
  GET_LIST_CARD_REQUEST
} from '../../reducers/Card/ActionType';
import { createCardMethod } from '../../../services/card/createCard';

function* requestCreateCard(data) {
  yield put({
    type: CREATE_CARD_FAIL,
    error: {
      isError: false,
      message: '',
      isLoad: true
    }
  })
  try {
    const result = yield call(createCardMethod, {card_token: data.card_token});
    yield put({
      type: CREATE_CARD_FAIL,
      error:{
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
      type:CREATE_CARD_FAIL,
      error:{
        isError: error.response.data.error,
        message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : '',
        isLoad: false
      }
    })
    yield put({
      type: CREATE_CARD_FAIL,
      error:{
        isError: false,
        message: '',
        isLoad: true
      }
    })
    return Promise.reject(error);
  }
}

function* createCard() {
  yield takeLatest(SET_CARD_TOKEN_REQUEST, requestCreateCard);
}

export default createCard;
