import * as types from './ActionType';

const initialState = {
  setData: [],
  marketForecast: [],
  showLoading: true
};
  // Redux: Counter Reducer
const Data = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_LIST_MARKET_FORECAST_REDUCER : {
      return {
        ...state,
        marketForecast: action.listData,
        showLoading: false
      }
    }
    case types.SET_PRODUCT_AND_COUNTRY_REDUCER: {
      return {
        ...state,
        setData: action.listData
      }
    }
    case types.SET_STATUS_LOADING_MARKET_FORECAST : {
      return{
        ...state,
        marketForecast: [],
        showLoading: action.showLoading
      }
    }
    default: {
      return state;
    }
  };
}
// Exports
export default Data;