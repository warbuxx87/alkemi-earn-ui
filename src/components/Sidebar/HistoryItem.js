// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import SvgIcon from "@material-ui/core/SvgIcon";
import { Typography } from "@material-ui/core";
import { History as HistoryIcon } from "../UI/Icons/history";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component
const SidebarHistoryItem = ({ onClick, selected }) => (
    <ListItem
        icon={<HistoryIcon fontSize="small" />}
        text={
            <Typography
                variant="subtitle2"
                style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
            >
                History
            </Typography>
        }
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarHistoryItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarHistoryItem;
