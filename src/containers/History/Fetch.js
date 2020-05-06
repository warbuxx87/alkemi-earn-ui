import {
    fetchStatsPending,
    fetchStatsSuccess
    // fetchStatsError
} from "redux/actions/data";

// import tx from "./MOCK_DATA.json";

const fetchStatsAction = tx => async dispatch => {
    dispatch(fetchStatsPending(tx));
    setTimeout(() => {
        // mock delay, will remove
        dispatch(fetchStatsSuccess(tx));
    }, 3000);
};

export default fetchStatsAction;
