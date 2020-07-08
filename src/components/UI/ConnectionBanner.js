// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

// Section 2: Material-UI imports
import { Box,Collapse,IconButton, makeStyles  } from "@material-ui/core";
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';

// Section 3: Components & Containers import from the application
import ConnectionBanner from "@rimble/connection-banner";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles(theme => ({
    root: {
    },
}));

function ConnectionAlerts({ networkID,
  APP_ETH_NETWORK, }) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
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
  );
}

// Section 6: Documentation with PropTypes


// Section 7:  Connect styles and export
export default ConnectionAlerts;
