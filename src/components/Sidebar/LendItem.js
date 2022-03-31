// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Typography } from "@mui/material";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";
import { Lend as LendIcon } from "../UI/Icons/lend";

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component
const SidebarLendItem = ({ onClick, selected }) => (
    <ListItem
        icon={<LendIcon fontSize="small" />}
        text={
            <Typography
                variant="subtitle2"
                style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
            >
                Lend
            </Typography>
        }
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarLendItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarLendItem;
