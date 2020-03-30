
import * as types from './ActionType';
  const initialState = {
    data : [],
  };
  // Redux: Counter Reducer
  const Data = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_COMMENTARY_HOME_REDUCER : 
      return {
        ...state,
        data : state.data.concat(action.payload)
      }
      case  types.RESET_LIST_COMMENTARY_HOME_REDUCER : 
      return {
        ...state,
        data : []
      }
      default: {
        return state;
      }
    }
  };
  // Exports
  export default Data;