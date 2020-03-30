
import * as types from './ActionType';
const initialState = {
    card: [],
    cards: [],
    create_card_fail:{
      isError: false,
      message:'',
      isLoad: true
    },
    default_card_fail:{
      isError: false,
      message:'',
      isLoad: true
    },
    remove_card_fail:{
      isError: false,
      message:'',
      isLoad: true
    },
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_CARD_REDUCER : {
        return {
          ...state,
          card : action.data
        };
      }
      case  types.GET_LIST_CARD_REDUCER : {
        return {
          ...state,
          cards : action.data
        };
      }
      case  types.CREATE_CARD_FAIL : {
        return {
          ...state,
          create_card_fail : action.error
        };
      }
      case  types.DEFAULT_CARD_FAIL : {
        return {
          ...state,
          default_card_fail : action.error
        };
      }
      case  types.REMOVE_CARD_FAIL : {
        return {
          ...state,
          remove_card_fail : action.error
        };
      }
      default: {
        return state;
      }
    };
  };
  // Exports
  export default Data;