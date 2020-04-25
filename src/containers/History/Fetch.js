import {
  fetchHistoryPending,
  fetchHistorySuccess,
  fetchHistoryError
} from "redux/actions/data";

function fetchHistory() {
  return dispatch => {
    dispatch(fetchHistoryPending());
    fetch("https://api.alkemi.network/info")
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          throw res.error;
        }
        dispatch(fetchHistorySuccess(res.transactions));
        return res.transactions;
      })
      .catch(error => {
        dispatch(fetchHistoryError(error));
      });
  };
}

export default fetchHistory;
