import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import styles from "./styles";
import withOnboard from 'utils/HOC/withOnBoard'
import { useLocation } from "react-router-dom";

const AppBar = ({ onboard }) => {
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
  const classes = styles();

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
    <MuiAppBar position="relative" className={classNames(classes.appBar)}>
      <Toolbar className={classNames(classes.toolbar)}>
        <Grid container>
          <Grid item md={6} className={classes.headerLeft}>
            <Grid item md={12} className={classes.overview}>
              OVERVIEW
            </Grid>
            <Grid item md={12} className={classes.current}>
              {title}
            </Grid>
          </Grid>
          <Grid item md={6} className={classes.notification}>
            <Grid className={classes.bell}>
              {" "}
              <NotificationsNoneIcon />
            </Grid>
            <Grid>
              <Button
                type="button"
                className={classes.btnActiveOutline}
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

// AppBar.propTypes = {
//     classes: PropTypes.object.isRequired,

// };

export default withOnboard(AppBar);
