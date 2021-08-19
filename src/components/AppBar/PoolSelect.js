// Main Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import Verified from "@material-ui/icons/VerifiedUser";
import Open from "@material-ui/icons/Public";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { Typography, makeStyles } from "@material-ui/core";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    toggleButton: {
        "& .MuiButtonBase-root": {
            minWidth: "110px",
            borderRadius: "4px",
            padding: "9px",
        },
        "& .MuiToggleButtonGroup-groupedHorizontal:not(:first-child) ": {
            marginLeft: 6,
            borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
        },
        "& .MuiToggleButton-root.Mui-selected": {
            backgroundColor: "rgba(255, 255, 255, 0.12)",
            border: "solid 1px rgba(255, 255, 255, .35) ",
        },
    },
    toggleTitle: {
        marginLeft: 8,
    },
}));

// Section 5: Code Component

export default function PoolSelect({ onChangePool, currentPool }) {
    const classes = useStyles();

    return (
        <ToggleButtonGroup
            value={currentPool}
            exclusive
            onChange={onChangePool}
            aria-label="text alignment"
            className={classes.toggleButton}
        >
            <ToggleButton
                value="permissioned"
                aria-label="left aligned"
                disabled={currentPool === "permissioned"}
            >
                <Verified fontSize="small" />{" "}
                <Typography className={classes.toggleTitle} variant="body2">
                    Verified
                </Typography>
            </ToggleButton>
            <ToggleButton
                value="open"
                aria-label="centered"
                disabled={currentPool === "open"}
            >
                <Open fontSize="small" />{" "}
                <Typography className={classes.toggleTitle} variant="body2">
                    Open
                </Typography>
            </ToggleButton>
        </ToggleButtonGroup>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
