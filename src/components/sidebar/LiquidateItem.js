import React from "react";
import PropTypes from "prop-types";

import LiquidateIcon from "@material-ui/icons/FormatColorReset";

import ListItem6 from "../UI/ListItem/6";


const SidebarLiquidateItem = ({ onClick, selected }) => (
    <ListItem6
        icon={<LiquidateIcon />}
        text="Liquidate"
        onClick={onClick}
        selected={selected}
    />
);

SidebarLiquidateItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};


export default SidebarLiquidateItem;
