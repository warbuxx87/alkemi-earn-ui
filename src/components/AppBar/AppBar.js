import React, { useState, useEffect } from "react";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import MuiAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import styles from "./styles";
import Onboard from "bnc-onboard";
import Web3 from "web3";
import { useLocation } from "react-router-dom";

let web3;
console.log(web3);

const DAPP_ID = process.env.REACT_APP_DAPP_ID;
const FORTMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY;
//const FORTMATIC_TEST_KEY = process.env.REACT_APP_FORTMATIC_TEST_KEY;
const PORTIS_KEY = process.env.REACT_APP_PORTIS_KEY;
const SQUARELINK_KEY = process.env.REACT_APP_SQUARELINK_KEY;
//const INFURA_ID = process.env.REACT_APP_INFURA_ID;
const INFURA_KEY = process.env.REACT_APP_INFURA_KEY;
// const APP_URL = process.env.REACT_APP_APP_URL
// const CONTACT_EMAIL = process.env.REACT_APP_CONTACT_EMAIL:
const RPC_URL = "https://main.infura.io/v3/" + INFURA_KEY;

const walletChecks = [
  { checkName: "derivationPath" },
  { checkName: "accounts" },
  { checkName: "connect" },
  { checkName: "network" },
  { checkName: "balance", minimumBalance: "1000000" }
];

const wallets = [
  { walletName: "coinbase", preferred: true },
  { walletName: "trust", preferred: true, rpcUrl: RPC_URL },
  { walletName: "metamask", preferred: true },
  {
    walletName: "portis",
    apiKey: PORTIS_KEY,
    preferred: true,
    label: "Portis"
  },
  {
    walletName: "squarelink",
    apiKey: SQUARELINK_KEY,
    preferred: true,
    label: "SquareLink"
  },
  {
    walletName: "fortmatic",
    apiKey: FORTMATIC_KEY,
    preferred: true
  }
];

const onboard = Onboard({
  dappId: DAPP_ID, // [String] The API key created by step one above
  networkId: 4, // [Integer] The Ethereum network ID your Dapp uses.
  darkMode: true,
  walletSelect: {
    wallets: wallets
  },
  subscriptions: {
    wallet: wallet => {
      web3 = new Web3(wallet.provider);
    }
  },
  walletCheck: walletChecks
});

const AppBar = () => {
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

export default AppBar;
