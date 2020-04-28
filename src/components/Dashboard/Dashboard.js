import React from "react";
import PropTypes from "prop-types";

import DashboardInfo from "components/Dashboard/Info";
import DashboardTable from "components/Dashboard/Table";

// import { withStyles } from "@material-ui/core/styles";

// const styles = theme => ({
//   someClass: color
//
// });

const Dashboard = () => (
    <div className="dashboard">
        <DashboardInfo></DashboardInfo>
        <DashboardTable></DashboardTable>
    </div>
);

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired
};

export default Dashboard;
