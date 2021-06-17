// Main Component

// Section 1: React low level imports
import React from "react";

// Section 2: Material-UI imports
import {
    IconButton,
    Box,
    Divider,
    Menu,
    MenuItem,
    SvgIcon,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application

import MenuIcon from "@material-ui/icons/MoreHoriz";
import PoolSelect from "./PoolSelect";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    iconbutton: {
        borderRadius: "4px",
        border: "solid 2px",
        borderColor: theme.palette.background.light,
        minHeight: "36px",
        minWidth: "36px",
    },
    dropdown: {
        marginTop: "4px",
    },
    menuitem: {
        fontSize: "0.875rem",
    },
}));

function Other() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // Section 5: Code Component
    return (
        <>
            <IconButton
                className={classes.iconbutton}
                size="small"
                color="inherit"
                onClick={handleClick}
            >
                <SvgIcon>
                    <MenuIcon />
                </SvgIcon>
            </IconButton>
            <Menu
                className={classes.dropdown}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box px={2} pb={3} pt={1}>
                    <Box mb={1}>
                        <Typography variant="body2">Pool Select</Typography>
                    </Box>
                    <PoolSelect />
                </Box>
                <Divider />
                <Box mt={2}>
                    <MenuItem
                        className={classes.menuitem}
                        onClick={handleClose}
                        href="//docs.alkemi.network/user-guide/"
                        target="_blank"
                        component="a"
                    >
                        User Guide
                    </MenuItem>
                    <MenuItem
                        className={classes.menuitem}
                        onClick={handleClose}
                        href="//support.alkemi.network/support/tickets/new"
                        target="_blank"
                        component="a"
                    >
                        Contact Support
                    </MenuItem>
                    <MenuItem
                        className={classes.menuitem}
                        onClick={handleClose}
                        href="//feedback.alkemi.network/feature-requests"
                        target="_blank"
                        component="a"
                    >
                        Feature Request
                    </MenuItem>
                    <MenuItem
                        className={classes.menuitem}
                        onClick={handleClose}
                        href="//feedback.alkemi.network/bug-reports"
                        target="_blank"
                        component="a"
                    >
                        Report Bug
                    </MenuItem>
                    <MenuItem
                        className={classes.menuitem}
                        onClick={handleClose}
                        href="//discord.gg/Y9vmtFjhHB"
                        target="_blank"
                        component="a"
                    >
                        Discord
                    </MenuItem>
                </Box>
            </Menu>
        </>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Other;
