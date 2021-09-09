// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import { Typography } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import ListItem from "../UI/ListItem";
import { Liquidate as LiquidateIcon } from "../UI/Icons/tank";

// Section 4: Define Styles function taking theme as argument and returning an object

// Section 5: Code Component
const SidebarLiquidateItem = ({ onClick, selected }) => (
    <ListItem
        icon={<LiquidateIcon fontSize="small" />}
        text={
            <Typography
                variant="subtitle2"
                style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
            >
                Liquidations
            </Typography>
        }
        onClick={onClick}
        selected={selected}
    />
);

// Section 6: Documentation with PropTypes
SidebarLiquidateItem.propTypes = {
    selected: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default SidebarLiquidateItem;
