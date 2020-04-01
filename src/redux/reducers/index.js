// Imports: Dependencies

import { combineReducers } from 'redux';
// Imports: Reducers
import { connectRouter } from 'connected-react-router'


const createRootReducer = (history) => {
    const reducers = combineReducers({

        router: connectRouter(history),
    });
    return reducers;
  };

// Exports
export default createRootReducer;