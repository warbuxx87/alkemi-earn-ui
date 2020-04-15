import React from "react";
import PropTypes from "prop-types";

import HistoryIcon from "@material-ui/icons/History";

import ListItem5 from "../UI/ListItem/5";


const SidebarHistoryItem = ({ onClick, selected }) => (
    <ListItem5
        icon={<HistoryIcon />}
        text="History"
        onClick={onClick}
        selected={selected}
    />
);

SidebarHistoryItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};


export default SidebarHistoryItem;
