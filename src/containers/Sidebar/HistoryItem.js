// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarHistoryItem from "../../components/Sidebar/HistoryItem";
// Constants
import { HISTORY } from "../../constants/routes";
// Selectors
import { isHistorySelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isHistorySelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(HISTORY)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarHistoryItem);
