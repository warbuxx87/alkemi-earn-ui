
import * as types from './ActionType';
const initialState = {
    category:[],
    categoryMarketData: [],
    categoryMarketForecast: []
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_CATEGORY_REDUCER : {
        return {
          ...state,
          category : action.listData
        };
      }
      case  types.GET_LIST_CATEGORY_MARKET_DATA_REDUCER : {
        return {
          ...state,
          categoryMarketData : action.listData
        };
      }
      case types.GET_LIST_CATEGORY_MARKET_FORECAST_REDUCER : {
        return {
          ...state,
          categoryMarketForecast : action.listData
        }
      }
      default: {
        return state;
      }
    };
  };
  // Exports
  export default Data;