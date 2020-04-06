import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import MuiAppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Web3 from 'web3';
import Toolbar from '@material-ui/core/Toolbar';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import styles from './styles';

const AppBar = () => {
  useEffect(()=>{
    connect()
    updateTitle();
  },[])


  const [title, setTitle] = useState(null);
  const [account,setAccount] = useState(null);
  const classes = styles();

  const  connect = () => {

    const web3 =  new Web3(Web3.givenProvider || null);
    web3.givenProvider.enable().then(res_accounts => {

      var string =  res_accounts[0].substr(0, 4) + "..." + res_accounts[0].substr(res_accounts[0].length - 4, 4);

      setAccount(string);
    })

  }

  const  updateTitle = () => {

    var currentTitle = "Not Set";

    switch (window.location.pathname) {
      case '/':
        currentTitle = 'Dashboard';
        break;
      case '/lending':
        currentTitle = 'Lending';
        break;
      case '/borrowing':
        currentTitle = 'Borrowing';
        break;
      case '/markets':
        currentTitle = 'Markets';
        break;
      case '/history':
        currentTitle = 'History';
        break;
      case '/connect':
        currentTitle = 'Connect';
        break;
      default:
        currentTitle = '404 Page Not Found';
        break;
      }

      setTitle(currentTitle);
    }



    return (
      <MuiAppBar
          position="absolute"
          className={classNames(
              classes.appBar
          )}
      >


        <Toolbar>
            <Grid container>
              <Grid item md={6}  className={classes.headerLeft}>
                  <Grid item md={12} className={classes.overview}>OVERVIEW</Grid>
                  <Grid item md={12} className={classes.current}>{title}</Grid>
              </Grid>
              <Grid item md={6} className={classes.notification}>
                  <Grid className={classes.bell}> <NotificationsNoneIcon/></Grid>
                  <Grid className={classes.notification}>
                    <Grid className={classes.borderNoti} onClick={connect}>
                      <Grid className={classes.statusBadge}></Grid>
                      <Grid className={classes.price} >
                        {/* 0x121565...6456 */}
                        {account ? account  : 'Connect' }
                      </Grid>
                    </Grid>

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
