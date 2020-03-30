import * as types from './actionTypes';

const initialState = {
    // chart
    data : []
    
    
  };
  // Redux: Counter Reducer
  const Chart = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_DATA_CHART_REDUCER : {
        return {
          ...state,
          data  :  action.dataChart
        };
      }
      default: { 
        return state;
      }
    }
  };
  // Exports
  export default Chart;