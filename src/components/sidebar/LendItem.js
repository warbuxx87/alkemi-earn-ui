import React from "react";
import PropTypes from "prop-types";

import LendIcon from "@material-ui/icons/AccountBalance";

import ListItem2 from "../UI/ListItem/2";


const SidebarLendItem = ({ onClick, selected }) => (
    <ListItem2
        icon={<LendIcon />}
        text="Lend"
        onClick={onClick}
        selected={selected}
    />
);

SidebarLendItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};


export default SidebarLendItem;
