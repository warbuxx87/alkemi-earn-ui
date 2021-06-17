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

export default function ToggleButtonNotEmpty() {
    const [alignment, setAlignment] = React.useState("left");
    const [formats, setFormats] = React.useState(() => ["phone"]);

    const handleFormat = (event, newFormats) => {
        if (newFormats.length) {
            setFormats(newFormats);
        }
    };
    const handleAlignment = (event, newAlignment) => {
        if (newAlignment !== null) {
            setAlignment(newAlignment);
        }
    };

    const classes = useStyles();

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            className={classes.toggleButton}
        >
            <ToggleButton value="left" aria-label="left aligned">
                <Verified fontSize="small" />{" "}
                <Typography className={classes.toggleTitle} variant="body2">
                    Verified
                </Typography>
            </ToggleButton>
            <ToggleButton value="right" aria-label="centered">
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
