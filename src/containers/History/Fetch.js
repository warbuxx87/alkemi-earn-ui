import {
  fetchLendPending,
  fetchLendSuccess,
  // fetchStatsError
} from "redux/actions/data";

// import tx_data from "./MOCK_DATA.json";

const fetchStats = (asset) => async dispatch => {
  dispatch(fetchLendPending(asset));
  // fetch("https://api.alkemi.network/info?data=markets")
  //   .then(res => res.json())
  //   .then(res => {
  setTimeout(() => { // mock delay, will remove
    dispatch(fetchLendSuccess(asset));
  }, 3000)
  //console.log("tx :" + tx);
  // return [tx_data];
  // });
};

export default fetchStats;
