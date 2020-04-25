// Imports Section 1: React/Reduxd low level imports
import { connect } from "react-redux";

// Imports Section 2: internal imports ( actions, selectors etc.)
import fetchHistoryAction from "./Fetch";
import {
  getHistoryError,
  getHistory,
  getHistoryPending
} from "redux/selectors/data";

//import tx_data from "./MOCK_DATA.json";

// Imports Section 3: Internal Components Imports
import History from "components/History/History";

const mapStateToProps = (state, ownProps) => ({
  error: state.data.history.error,
  history: state.data.history.tx,
  pending: state.data.history.pending
});

const mapDispatchToProps = {
  fetchHistory: fetchHistoryAction
};

export default connect(mapStateToProps, mapDispatchToProps)(History);
