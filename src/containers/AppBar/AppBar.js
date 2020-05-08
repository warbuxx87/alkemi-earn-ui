import { connect } from "react-redux";
import { compose } from "redux";
import withOnBoard from "containers/Drizzle/withOnBoard";
import AppBar from "components/AppBar/AppBar";
import { getAddress } from "redux/selectors/account";

const mapStateToProps = state => ({
    shifted: state.ui.sidebar.open,
    accountAddress: getAddress(state)
});

export default compose(withOnBoard(), connect(mapStateToProps))(AppBar);
