
import * as types from './ActionType';
const initialState = {
    countries:[],
    countriesMarketData:[],
    countriesMarketForecast: []
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_COUNTRIES_REDUCER : {
        return {
          ...state,
          countries : action.listData
        };
      }
      case  types.GET_LIST_COUNTRIES_MARKET_DATA_REDUCER : {
        return {
          ...state,
          countriesMarketData : action.listData
        };
      }
      case types.GET_LIST_COUNTRIES_MARKET_FORECAST_REDUCER : {
        return {
          ...state,
          countriesMarketForecast : action.listData
        }
      }
      default: {
        return state;
      }
    };
  };
  // Exports
  export default Data;