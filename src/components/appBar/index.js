import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from "prop-types";
import classNames from "classnames";
import Grid from '@material-ui/core/Grid';
import MuiAppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import Web3 from 'web3';
import Title from './title'
import Toolbar from '@material-ui/core/Toolbar';

const drawerWidth = 339;

const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px 10px 10px 10px',
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - 400px)`,
    marginLeft: '375px',
    // backgroundColor:'white',
    boxShadow:'none',
    backgroundColor:'#000000',
    paddingTop:'22px',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,

  },
  drawerPaper: {
    width: drawerWidth,
    margin: '22px 0px 0px 35px',
    background: '#202123',
    color: 'white',

  },
  // necessary for content to be below app bar
  toolbar:{
    padding:'24px 19px',
  },
  image:{
    width:'163px',
    height:'27px',
  },
  divider:{
    backgroundColor:'#000000',
  },
  menuList:{
    padding:'24px 0 24px 0px'
  },
  menuItem:{
    backgroundColor:'#161719',
    borderLeft:'3px solid #FFFFFF',
    opacity: 1,
  },
  menuItemText:{
    paddingLeft:'4px',
    textTransform: 'capitalize',
    opacity: 1,
    //font: Regular 16px/21px Roboto;
    fontFamily:'Regular,Roboto',
    fontSize:'10px'
  },

  walletHeading:{
    fontSize:'16px',
    fontWeight:'500',
  },

  wallet:{
    display:'flex',
    justifyContent:'flex-end',
    marginLeft:'auto',
    marginRight:'0',
    paddingRight:'4px',
    fontSize: '14px',
    color:'#a7a7a7',
    alignItems:'center',
  },
  status:{
    background: 'green',
    width: '9px',
    height: '9px',
    borderRadius : '5px',
    marginRight:'8px'
  },
  number:{
    textAlign:'right',
    width:'50%',
    fontWeight:'500',
    paddingRight:'4px',
  },
  unit:{
    width:'50%',
  },
  overview:{
    letterSpacing: 0,
    color: '#6F7278',
    opacity: 1,
    fontSize:'14px',
  },
  current:{
    color: '#FFFFFF',
    fontSize:'26px',
    fontWeight:'bolder'
  },
  headerLeft:{
    paddingTop:'10px',
  },
  borderNoti:{
    display:'flex',
    width: '168px',
    height: '36px',
    justifyContent:'center',
    border: '1px solid #FFFFFF',
    borderRadius: '100px',
    opacity: '1',
    marginTop:'25px',
  },
  price:{
    paddingTop:'7px',
  },
  statusBadge:{
    background: 'green',
    width: '9px',
    height: '9px',
    borderRadius : '5px',
    marginTop: '12px',
    marginRight:'5px'
  },
  notification:{
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
  },
  content: {
    marginTop:'100px',
    marginLeft:'125px',
    marginRight:'100px',
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));


const AppBar = () => {
  useEffect(()=>{
    connect();
  },[])



  const [account,setAccount] = useState(null);
  const classes = useStyles();

  const  connect = () => {

    const web3 =  new Web3(Web3.givenProvider || null);
    web3.givenProvider.enable().then(res_accounts => {

      var string =  res_accounts[0].substr(0, 4) + "..." + res_accounts[0].substr(res_accounts[0].length - 4, 4);

      setAccount(string);
    })

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
                  <Grid item md={12} className={classes.current}></Grid>
              </Grid>
              <Grid item md={6} className={classes.notification}>
                  <Grid></Grid>
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

AppBar.propTypes = {
    classes: PropTypes.object.isRequired,

};

export default AppBar;
