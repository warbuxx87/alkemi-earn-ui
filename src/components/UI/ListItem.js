// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    item: {
        paddingLeft: 16,
        paddingRight: 16,
        color: "#b1b1b1",
        "&:hover": {
            backgroundColor: "transparent",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "#4948F6",
            },
        },
    },
    selected: {
        backgroundColor: "rgb(235, 237, 255, 0.07)",
        borderRadius: "4px",
        color: "#ffffff",
        "& .MuiListItemIcon-root": {
            color: "#4948F6",
        },
        "&$selected:hover": {
            backgroundColor: "rgb(235, 237, 255, 0.07)",
            color: "white",
            "& .MuiListItemIcon-root": {
                color: "#4948F6",
            },
        },
    },
    itemIcon: {
        minWidth: 0,
        marginRight: 16,
        color: "#b1b1b1",
    },
}));

// Section 5: Code Component
const ListItem1 = ({ icon, text, onClick, selected, ...props }) => {
    const classes = useStyles();
    return (
        <ListItem
            button
            onClick={onClick}
            {...props}
            className={clsx(classes.item, { [classes.selected]: selected })}
        >
            <ListItemIcon className={classes.itemIcon}>{icon}</ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};

// Section 6: Documentation with PropTypes
ListItem1.propTypes = {
    icon: PropTypes.node.isRequired,
    text: PropTypes.object.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func.isRequired,
};

// Section 7:  Connect styles and export
export default ListItem1;
