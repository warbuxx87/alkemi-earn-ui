import { connect } from "react-redux";

import { closeSidebar, openSidebar } from "../../redux/actions/ui";

import Sidebar from "../../components/Sidebar/Sidebar";

const mapStateToProps = (state, ownProps) => ({
    open: state.ui.sidebar.open
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
 