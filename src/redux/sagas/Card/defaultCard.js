import { call, put, takeLatest } from 'redux-saga/effects';
import {
  SET_DEFAULT_CARD_REQUEST,
  DEFAULT_CARD_FAIL,
  GET_LIST_CARD_REQUEST
} from '../../reducers/Card/ActionType';
import { defaultCard } from '../../../services/card/defaultCard';

function* requestDefaultCard(action) {
	yield put({
	    type: DEFAULT_CARD_FAIL,
	    error: {
	      	isError: false,
	      	message: '',
      		isLoad: true
	    }
  	})
  	try {
    	const result = yield call(defaultCard, action.id);
	  	yield put({
		    type: DEFAULT_CARD_FAIL,
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
	      	type:DEFAULT_CARD_FAIL,
	      	error:{
	        	isError: error.response.data.error,
	        	message: error.response.data.errors && error.response.data.errors[0] ? error.response.data.errors[0].errorMessage : '',
	        	isLoad: false
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
    	return Promise.reject(error);
  	}
}

function* defaultCardDetail() {
  yield takeLatest(SET_DEFAULT_CARD_REQUEST, requestDefaultCard);
}

export default defaultCardDetail;
