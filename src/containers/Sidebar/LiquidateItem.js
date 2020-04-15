// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarLiquidateItem from "../../components/Sidebar/LiquidateItem";
// Constants
import { LIQUIDATE } from "../../constants/routes";
// Selectors
import { isItemSelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isItemSelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(LIQUIDATE)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarLiquidateItem);
