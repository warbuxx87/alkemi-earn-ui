import React from "react";
import PropTypes from "prop-types";

import DashboardIcon from "@material-ui/icons/Home";

import ListItem1 from "../UI/ListItem/1";

const SidebarDashboardItem = ({ onClick, selected }) => (
    <ListItem1
        icon={<DashboardIcon />}
        text="Dashboard"
        onClick={onClick}
        selected={selected}
    />
);

SidebarDashboardItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};




export default SidebarDashboardItem;
