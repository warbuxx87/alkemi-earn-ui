import {
  fetchStatsPending,
  fetchStatsSuccess,
  // fetchStatsError
} from "redux/actions/data";

import tx_data from "./MOCK_DATA.json";

function fetchStats() {
  return dispatch => {
    dispatch(fetchStatsPending());
    // fetch("https://api.alkemi.network/info?data=markets")
    //   .then(res => res.json())
    //   .then(res => {
    dispatch(fetchStatsSuccess([tx_data]));
    //console.log("tx :" + tx);
    return [tx_data];
    // });
  };
}

export default fetchStats;
