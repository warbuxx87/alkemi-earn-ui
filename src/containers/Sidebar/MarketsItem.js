// Libs
import { connect } from "react-redux";
import { push } from "connected-react-router";
// Component
import SidebarMarketsItem from "../../components/Sidebar/MarketsItem";
// Constants
import { MARKETS } from "../../constants/routes";
// Selectors
import { isItemSelected } from "../../redux/selectors/ui";

const mapStateToProps = state => ({
    selected: isItemSelected(state)
});

const mapDispatchToProps = {
    onClick: () => push(MARKETS)
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SidebarMarketsItem);
