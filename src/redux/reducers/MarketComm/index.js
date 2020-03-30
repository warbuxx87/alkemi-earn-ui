
import * as types from './ActionType';
import {isEmpty} from 'lodash'
const initialState = {
    marketComm:{
        data : [],
        page : 0,
        country: "all",
        filter: "all",
        user_country: "all",
        isFull : false,
        isLoad : false
    },
    ishide:false,
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_MARKET_COMM_REDUCER : 
        return {
          ...state,
          marketComm : {...action.listData, isLoad : false}
        }
      case  types.UPDATE_IS_LOAD_MORE_MARKET_COMM : 
        return {
          ...state,
          marketComm : {...state.marketComm, isLoad : action.payload.isLoad ,data :  action.payload.isloadMore ? state.marketComm.data : []}
        }
      case types.UPDATE_DATA_MARKET_COMM :
        return {
          ...state,
          marketComm:{
            data : [],
            page : 0,
            country: "all",
            filter: "all",
            user_country: "all",
            isFull : false,
            isLoad : false,
            a: console.log('lieu'),
          }
        }
        case types.CHECK_DATA_HIDDEN :
          return {
            ...state,
           ishide: action.payload
          } 
      default: {
        return state;
      }
    };
  };
  // Exports
  export default Data;