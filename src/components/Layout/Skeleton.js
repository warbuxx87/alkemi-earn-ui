// Main Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: UI imports
import { withStyles, fade  } from "@material-ui/core/styles";
import { Box,Collapse, IconButton,  } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

// Section 3: Components & Containers import from the application
import ConnectionBanner from "@rimble/connection-banner";
import LayoutContent from "containers/Layout/Content";
import Sidebar from "containers/Sidebar/Sidebar";
import AppBar from "containers/AppBar/AppBar";

// Section 4: Define Styles function taking theme as argument and returning an object
const styles = (theme) => ({
    frame: {
        position: "relative",
        display: "flex",
        width: "100%",
        minHeight: "100%",
      },
    alert: {
      backgroundColor: fade (theme.palette.background.paper, 0.5),
    },
    content: {
        position: "relative",
        width: "100%",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        marginLeft: 32,
        marginRight: 32,
        "@media (min-width: 1720px)": {
            maxWidth: "1280px",
            margin: "0 auto",
        },
        "@media (max-width:1024px)": {
            marginLeft: 0,
            marginRight: 0,
        },
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
        },
    },
    contentShifted: {
        width: "calc(100% - 400px)",
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        minHeight: "calc(100% - 56px)",
        //marginTop: 56,
        marginTop: "100px",
        marginLeft: "125px",
        marginRight: "100px",
        [theme.breakpoints.up("sm")]: {
            minHeight: "calc(100% - 64px)",
            marginTop: 100,
        },
        "@media (min-width: 1550px)": {
            marginLeft: "50px!important",
            marginRight: "25px!important",
        },
    },
});

// Section 5: Code Component
function LayoutSkeleton ({
    classes,
    networkID,
    APP_ETH_NETWORK,
    /*, address*/
    /*, walletConnected*/
}) {
  const [open, setOpen] = React.useState(true);
    // networkID is null when no wallet is selected
    return (
        <div className={classes.frame}>
            <Sidebar />
            <div className={classes.content}>
                <AppBar />
                <Box>
                    <ConnectionBanner
                        currentNetwork={
                            networkID === null
                                ? networkID
                                : parseInt(networkID, 10)
                        }
                        requiredNetwork={APP_ETH_NETWORK}
                    >
                        {{
                            notWeb3CapableBrowserMessage: (
                                <div>
                                <Collapse in={open}>
                                 <Alert
                                    className={classes.alert}
                                    severity="error" color="error"
                                    action={
                                   <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }>
                                        Please connect using a web3 capable browser.
                                  </Alert>
                                  </Collapse>
                                </div>
                            ),
                            noNetworkAvailableMessage: (
                              <div>
                              <Collapse in={open}>
                               <Alert
                               className={classes.alert}
                               severity="info" color="success"
                               action={
                                 <IconButton
                                  aria-label="close"
                                  color="inherit"
                                  size="small"
                                  onClick={() => {
                                    setOpen(false);
                                  }}
                                  >
                                  <CloseIcon fontSize="inherit" />
                                  </IconButton>
                                }>
                                      Please connect using the connect button
                                      on the top right.
                                </Alert>
                                </Collapse>
                              </div>
                            ),
                            onWrongNetworkMessage: (
                                <div>
                                <Collapse in={open}>
                                 <Alert
                                    severity="warning" color="warning"
                                    action={
                                   <IconButton
                                    aria-label="close"
                                    color="inherit"
                                    size="small"
                                    onClick={() => {
                                      setOpen(false);
                                    }}
                                    >
                                    <CloseIcon fontSize="inherit" />
                                    </IconButton>
                                  }>
                                        Incorrect Network! Please connect to the Rinkeby Test Network
                                  </Alert>
                                  </Collapse>
                                </div>
                            ),
                        }}
                    </ConnectionBanner>
                </Box>
                <LayoutContent />
            </div>
        </div>
    );
};

// Section 6: Documentation with PropTypes
LayoutSkeleton.propTypes = {
    classes: PropTypes.object.isRequired,
};

// Section 7:  Connect styles and export
export default withStyles(styles)(LayoutSkeleton);
