// Section 1: React low level imports
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useLocation } from "react-router-dom";

// Section 2: Material-UI imports
import Grid from "@material-ui/core/Grid";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import { withStyles } from "@material-ui/core/styles";

// Section 3: Components & Containers import from the application
import withOnboard from "utils/HOC/withOnBoard";

const styles = theme => ({
  appBar: {
    // backgroundColor:'white',
    boxShadow: "none",
    backgroundColor: "#000000",
    paddingTop: "22px",
    paddingBottom: 30
  },
  // necessary for content to be below app bar
  toolbar: {
    padding: 0
  },
  image: {
    width: "163px",
    height: "27px"
  },
  divider: {
    backgroundColor: "#000000"
  },
  menuList: {
    padding: "24px 0 24px 0px"
  },
  menuItem: {
    backgroundColor: "#161719",
    borderLeft: "3px solid #FFFFFF",
    opacity: 1
  },
  menuItemText: {
    paddingLeft: "4px",
    textTransform: "capitalize",
    opacity: 1,
    //font: Regular 16px/21px Roboto;
    fontFamily: "Regular,Roboto",
    fontSize: "10px"
  },
  status: {
    background: "green",
    width: "9px",
    height: "9px",
    borderRadius: "5px",
    marginRight: "8px"
  },
  number: {
    textAlign: "right",
    width: "50%",
    fontWeight: "500",
    paddingRight: "4px"
  },
  unit: {
    width: "50%"
  },
  overview: {
    letterSpacing: 0,
    color: "#6F7278",
    opacity: 1,
    fontSize: "14px"
  },
  current: {
    color: "#FFFFFF",
    fontSize: "26px",
    fontWeight: "bolder"
  },
  headerLeft: {
    paddingTop: "10px"
  },
  borderNoti: {
    display: "flex",
    width: "168px",
    height: "36px",
    justifyContent: "center",
    border: "1px solid #FFFFFF",
    borderRadius: "100px",
    opacity: "1",
    marginTop: "25px"
  },

  bell: {
    paddingTop: "32px",
    paddingRight: "15px"
  },
  statusBadge: {
    background: "green",
    width: "9px",
    height: "9px",
    borderRadius: "5px",
    marginRight: "12px"
  },

  btnActiveOutline: {
    display: "flex",
    width: "150px",
    height: "36px",
    justifyContent: "center",
    border: "1px solid #FFFFFF",
    borderRadius: "100px",
    opacity: "1",
    marginTop: "25px",
    color: "white"
  },
  notification: {
    display: "flex",
    justifyContent: "flex-end",
    paddingRight: "5px"
  }
});

const AppBar = ({ onboard, classes }) => {
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

// Documentation with PropTypes
AppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withOnboard(withStyles(styles)(AppBar));
