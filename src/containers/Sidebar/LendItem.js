// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarLendItem from "../../components/Sidebar/LendItem";
// Constants
import { LEND } from "../../constants/routes";
// Selectors
import { isLendSelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isLendSelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(LEND)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarLendItem);
