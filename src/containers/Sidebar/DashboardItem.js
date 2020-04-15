// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarDashboardItem from "../../components/Sidebar/DashboardItem";
// Constants
import { DASHBOARD } from "../../constants/routes";
// Selectors
import { isItemSelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isItemSelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(DASHBOARD)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarDashboardItem);
