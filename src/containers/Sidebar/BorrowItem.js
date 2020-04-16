// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarBorrowItem from "../../components/Sidebar/BorrowItem";
// Constants
import { BORROW } from "../../constants/routes";
// Selectors
import { isItemSelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isItemSelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(BORROW)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarBorrowItem);
