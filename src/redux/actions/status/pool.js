// Primary use is to select between open and permissioned pools

// Section 1: Utilities imports and low level imports
import { getPool } from "redux/selectors/status/pool";

// Section 2: Action types declarations and action creators

//                                      //
// ----------- POOL ACTIONS ----------- //
//                                      //

// Declare action type as a constant
export const SET_POOL = "SET_POOL";

// Declare action creator
export const setPool = (pool) => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: SET_POOL,
    payload: {
        pool,
    },
});

// Section 3: Action dispatch methods and async funcs
// export const onPoolChange = ({ pool, defaultPoolChecked }) => async (dispatch, getState) => {
//     if (getPool(getState()) !== pool) {

//         if(defaultPoolChecked) {
//             window.localStorage.setItem("defaultPool", pool);
//         }

//         dispatch(setPool(pool));

//         window.location.reload();
//     }
// };
