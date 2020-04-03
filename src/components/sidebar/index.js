import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Route, Link } from "react-router-dom";
import Alkemi from '../../assets/images/alkemi.png';
import Connect from '../../pages/connect';
import Lending from '../../pages/lending';
import Borrowing from '../../pages/borrowing';
import Markets from '../../pages/markets';
import Liquidate from '../../pages/liquidate/liquidateNoWeb3';
//web3
import Web3 from 'web3';



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


const PermanentDrawerLeft = () => {
  useEffect(()=>{
    connect();
  },[])

  const [title] = useState(true);
  const [status, setStatus] = useState(null);
  const [account,setAccount] = useState(null);
  const classes = useStyles();
  const onItemClick = (e) => {
      setStatus(e);
  };

  const  connect = () => {

    const web3 =  new Web3(Web3.givenProvider || null);
    web3.givenProvider.enable().then(res_accounts => {

      var string =  res_accounts[0].substr(0, 4) + "..." + res_accounts[0].substr(res_accounts[0].length - 4, 4);

      setAccount(string);
    })

  }

  return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>

              <Grid container>
                <Grid item md={6}  className={classes.headerLeft}>
                    <Grid item md={12} className={classes.overview}>OVERVIEW</Grid>
                    <Grid item md={12} className={classes.current}>{title}</Grid>
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
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} >
             <img className={classes.image} src={Alkemi} alt={'Alkemi'} />
          </div>
          <Divider className={classes.divider}  />

          <List className={classes.menuList}>
            <ListItem className={ status!= null && status === 1 ? classes.menuItem : '' } button component={Link} to="/" onClick={() => onItemClick(1)}>
              <ListItemText className={classes.menuItemText}>Dashboard</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 2 ? classes.menuItem : '' } button component={Link} to="/lending" onClick={() => onItemClick(2)}>
              <ListItemText className={classes.menuItemText}>Lending</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 3 ? classes.menuItem : '' } button component={Link} to="/borrowing" onClick={() => onItemClick(3)}>
              <ListItemText className={classes.menuItemText}>Borrowing</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 4 ? classes.menuItem : '' } button component={Link} to="/markets" onClick={() => onItemClick(4)}>
              <ListItemText className={classes.menuItemText}>Markets</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 5 ? classes.menuItem : '' } button component={Link} to="/liquidate" onClick={() => onItemClick(5)}>
              <ListItemText className={classes.menuItemText}>Liquidate</ListItemText>
            </ListItem>
          </List>
          <Divider className={classes.divider}  />
            <ListItem>
              <ListItemText className={classes.menuItemText}>
                <Grid container>
                  <Grid className={classes.walletHeading}>Wallet Balance</Grid>
                  <Grid className={classes.wallet}>
                    <Grid className={classes.status}></Grid>
                    <Grid>Metamask</Grid>
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
          <Divider className={classes.divider}  />
            <ListItem>
              <ListItemText className={classes.menuItemText}>
                <Grid container>
                  <Grid  className={classes.unit}>ETH</Grid>
                  <Grid className={classes.number}>
                    343.4885
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={classes.menuItemText}>
                <Grid container>
                  <Grid  className={classes.unit}>DAI</Grid>
                  <Grid className={classes.number}>
                    11234.88
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={classes.menuItemText}>
                <Grid container>
                  <Grid  className={classes.unit}>USDC</Grid>
                  <Grid className={classes.number}>
                    8744.47
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText className={classes.menuItemText}>
                <Grid container>
                  <Grid  className={classes.unit}>WBTC</Grid>
                  <Grid className={classes.number}>
                    0.38495
                  </Grid>
                </Grid>
              </ListItemText>
            </ListItem>
            <Divider className={classes.divider}  />
        </Drawer>

        <main className={classes.content}>
          {/* <div className={classes.toolbar} /> */}
          <Route exact path="/" component={Connect} title="Connect" />
          <Route path="/lending" component={Lending} />
          <Route path="/borrowing" component={Borrowing} />
          <Route path="/markets" component={Markets} />
          <Route path="/liquidate" component={Liquidate} />
        </main>
      </div>
  );
}
export default PermanentDrawerLeft;
