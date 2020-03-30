import * as types from './ActionType';
const initialState = {
    markerDataHome: {
        products : [],
        position : 0,
        total : 0
    },
    markerDataPublic: {
        products : [],
        position : 0,
        total : 0
    },
    markerData: {
        products : [],
        position : 0,
        total : 0,
        filter: {},
        isFull : false,
        isLoad : false,
        isLoadFirst: true
    },
    analysisData: {},
    isLoading: true,
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_DATA_HOME_REDUCER : {
        return {
          ...state,
          markerDataHome : action.listData
        };
      }
      case  types.GET_LIST_MARKET_DATA_PUBLIC_REDUCER : {
        return {
          ...state,
          markerDataPublic : action.listData
        };
      }
      case  types.GET_LIST_MARKET_DATA_REDUCER : {
        return {
          ...state,
          markerData : {...action.listData, filter : action.filter, isFull: action.isFull, isLoad: action.isLoad, isLoadFirst: action.isLoadFirst}
        };
      }
      case  types.UPDATE_IS_LOAD_MORE_MARKET_DATA : 
        return {
          ...state,
          markerData : {...state.markerData, isFull : false, isLoad : action.payload.isLoad , products: action.payload.isloadMore ? state.markerData.products : []}
        }
      case types.GET_LIST_DATA_ANALYSIS_REDUCER :
        return {
          ...state,
          analysisData: action.listData,
          isLoading: false
        }
        case types.SET_STATUS_LOADING : {
          return{
            ...state,
            analysisData: {},
            isLoading: action.showLoading
          }
        }
        case types.UPDATE_DATA_REDUCER : {
          return{
            ...state,
            marketData: {...state.markerData, products : [], isFull : false}
          }
        }
      default: {
        return state;
      }
    }
  };
  // Exports
  export default Data;