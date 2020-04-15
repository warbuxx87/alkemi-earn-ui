import React from "react";
import PropTypes from "prop-types";

import MarketsIcon from "@material-ui/icons/Equalizer";

import ListItem4 from "../UI/ListItem/4";


const SidebarMarketsItem = ({ onClick, selected }) => (
    <ListItem4
        icon={<MarketsIcon />}
        text="Markets"
        onClick={onClick}
        selected={selected}
    />
);

SidebarMarketsItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired
};


export default SidebarMarketsItem;
