import { connect } from "react-redux";
import { withRouter } from "react-router";

import NoWhereDashboardButton from "components/NoWhere/DashboardButton";
import { DASHBOARD } from "constants/routes";

const mapDispatchToProps = (_, props) => ({
    onClick: () => props.history.push(DASHBOARD),
});

export default withRouter(connect(mapDispatchToProps)(NoWhereDashboardButton));
