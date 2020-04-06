import React, {useState, useEffect} from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import Alkemi from '../../assets/images/alkemi.png';
import styles from './styles';



const PermanentDrawerLeft = () => {
  const classes = styles();
  const [status, setStatus] = useState(null);
  const  updateTitle = () => {
    var i = 0;

    switch (window.location.pathname) {
      case '/':
        setStatus(1);
        break;
      case '/lending':
        setStatus(2);
        break;
      case '/borrowing':
        setStatus(3);
        break;
      case '/markets':
        setStatus(4);
        break;
      case '/history':
        setStatus(5);
        break;
      default:
        setStatus(1);
        break;
      }

      // setTitle(currentTitle);
    }
  const onItemClick = (e) => {
      setStatus(e);
  };
  
  useEffect(()=>{
    console.log(window.location.pathname);
    updateTitle();
  },[window.location])

  return (

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
              <ListItemText className={classes.menuItemText}>Lend</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 3 ? classes.menuItem : '' } button component={Link} to="/borrowing" onClick={() => onItemClick(3)}>
              <ListItemText className={classes.menuItemText}>Borrow</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 4 ? classes.menuItem : '' } button component={Link} to="/markets" onClick={() => onItemClick(4)}>
              <ListItemText className={classes.menuItemText}>Markets</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 5 ? classes.menuItem : '' } button component={Link} to="/history" onClick={() => onItemClick(5)}>
              <ListItemText className={classes.menuItemText}>History</ListItemText>
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



  );
}
export default PermanentDrawerLeft;
