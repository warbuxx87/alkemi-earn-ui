// Main Component

// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

// Section 2: Material-UI imports
import MuiAppBar from "@material-ui/core/AppBar";
import {
    Button,
    Grid,
    makeStyles,
    Toolbar,
    Typography
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import Settings from "./Settings";
import Notifications from "./Notifications";
//import withOnboard from "containers/Drizzle/withOnBoard";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles(theme => ({
    root: {},
    statusBadge: {
        backgroundColor: theme.palette.success.main,
        width: "9px",
        height: "9px",
        borderRadius: "5px",
        marginRight: "12px"
    },
    connectWallet: {
        minWidth: 130
    }
}));

// Section 5: Code Component
const AppBar = ({ onboard }) => {
    const classes = useStyles();
    let location = useLocation();
    useEffect(() => {
        var currentTitle = "Not Set";

        switch (location.pathname) {
            case "/dashboard":
                currentTitle = "Dashboard";
                break;
            case "/lend":
                currentTitle = "Lending";
                break;
            case "/borrow":
                currentTitle = "Borrowing";
                break;
            case "/markets":
                currentTitle = "Markets";
                break;
            case "/history":
                currentTitle = "History";
                break;
            case "/liquidate":
                currentTitle = "Liquidate";
                break;
            case "/connect":
                currentTitle = "Connect";
                break;
            default:
                currentTitle = "404 Page Not Found";
                break;
        }

        setTitle(currentTitle);
    }, [location]);

    const [title, setTitle] = useState(null);
    const [account, setAccount] = useState(null);

    const connect = async () => {
        await onboard.walletSelect();
        await onboard.walletCheck();
        const currentState = onboard.getState();
        //  console.log(currentState.address);
        var account =
            currentState.address.substr(0, 4) +
            "..." +
            currentState.address.substr(currentState.address.length - 4, 4);
        setAccount(account);
    };

    return (
        <MuiAppBar color="transparent" position="relative">
            <Toolbar disableGutters={true}>
                <Grid
                    container
                    alignItems="center"
                    direction="row"
                    justify="flex-start"
                    wrap="nowrap"
                >
                    <Grid item>
                        <Typography variant="subtitle2" color="textSecondary">
                            OVERVIEW
                        </Typography>
                        <Typography variant="h3" color="textPrimary">
                            {title}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        alignItems="center"
                        spacing={2}
                        justify="flex-end"
                    >
                        <Grid item>
                            <Settings />
                            <Notifications />
                        </Grid>
                        <Grid item>
                            <Button
                                className={classes.connectWallet}
                                type="button"
                                variant="outlined"
                                color="secondary"
                                onClick={connect}
                            >
                                <Grid className={classes.statusBadge}></Grid>
                                <Grid className={classes.price}>
                                    {/* 0x121565...6456 */}
                                    {account ? account : "Connect"}
                                </Grid>
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Toolbar>
        </MuiAppBar>
    );
};

// Section 6: Documentation with PropTypes
AppBar.propTypes = {
    //classes: PropTypes.object.isRequired
};

// Section 7:  Connect styles and export
export default AppBar;
