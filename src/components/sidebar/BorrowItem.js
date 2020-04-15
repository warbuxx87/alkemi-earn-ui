import React from "react";
import PropTypes from "prop-types";

import BorrowIcon from "@material-ui/icons/CreditCard";

import ListItem3 from "../UI/ListItem/3";


const SidebarBorrowItem = ({ onClick, selected }) => (
    <ListItem3
        icon={<BorrowIcon />}
        text="Borrow"
        onClick={onClick}
        selected={selected}
    />
);

SidebarBorrowItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};


export default SidebarBorrowItem;
