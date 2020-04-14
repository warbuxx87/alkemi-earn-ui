import React, {useState} from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Grid from '@material-ui/core/Grid';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import logo from '../../assets/images/alkemi.png';
import styles from './styles';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import dashboard from '../../assets/images/dashboard.svg'
import piggybank from '../../assets/images/piggy-bank.svg'
import money from '../../assets/images/money.svg'
import graph from '../../assets/images/graph.svg'
import history from '../../assets/images/history.svg'
import drop from '../../assets/images/drop.svg'
import menu from '../../assets/images/menu.svg'
import ListItemIcon from '@material-ui/core/ListItemIcon';

const PermanentDrawerLeft = () => {
  const classes = styles();
  const [status, setStatus] = useState(null);
  const onItemClick = (e) => {
      setStatus(e);
  };
  const [open, setOpen] = React.useState(true);

  const toggleDrawerStyle = () => {
    setOpen(!open);
  };

  return (
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx(classes.drawerPaper, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
          anchor="left"
        >
          <div className={classes.toolbar}>
             <img className={classes.image} src={logo} alt={'Alkemi Logo'} />
             <IconButton 
                aria-label="menu" 
                color="secondary"
                onClick={toggleDrawerStyle}
                className={clsx({
                  [classes.activeMenuIcon]: open,
                })}
              >
               <img src={menu} alt='' width={15} />
             </IconButton>
          </div>
          <Divider className={classes.divider}  />

          <List className={classes.menuList}>
            <ListItem className={status!= null && status === 1 ? classes.MenuItem : classes.menuItem } button component={Link} to="/" onClick={() => onItemClick(1)}>
              <ListItemIcon><img src={dashboard} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>Dashboard</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 2 ? classes.MenuItem : classes.menuItem } button component={Link} to="/lending" onClick={() => onItemClick(2)}>
             <ListItemIcon><img src={piggybank} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>Lend</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 3 ? classes.MenuItem : classes.menuItem } button component={Link} to="/borrowing" onClick={() => onItemClick(3)}>
              <ListItemIcon><img src={money} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>Borrow</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 4 ? classes.MenuItem : classes.menuItem } button component={Link} to="/markets" onClick={() => onItemClick(4)}>
              <ListItemIcon><img src={graph} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>Markets</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 5 ? classes.MenuItem : classes.menuItem } button component={Link} to="/history" onClick={() => onItemClick(5)}>
              <ListItemIcon><img src={history} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>History</ListItemText>
            </ListItem>
            <ListItem className={ status!= null && status === 6 ? classes.MenuItem : classes.menuItem } button component={Link} to="/liquidate" onClick={() => onItemClick(6)}>
              <ListItemIcon><img src={drop} alt='' /></ListItemIcon>
              <ListItemText className={classes.menuItemText}>Liquidate</ListItemText>
            </ListItem>
          </List>
          <Divider className={classes.divider}  />
          {open && (
            <>
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
                      0
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className={classes.menuItemText}>
                  <Grid container>
                    <Grid  className={classes.unit}>DAI</Grid>
                    <Grid className={classes.number}>
                      0
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className={classes.menuItemText}>
                  <Grid container>
                    <Grid  className={classes.unit}>USDC</Grid>
                    <Grid className={classes.number}>
                    0
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
              <ListItem>
                <ListItemText className={classes.menuItemText}>
                  <Grid container>
                    <Grid  className={classes.unit}>WBTC</Grid>
                    <Grid className={classes.number}>
                      0
                    </Grid>
                  </Grid>
                </ListItemText>
              </ListItem>
              <Divider className={classes.divider}  />
            </>
          )}
        </Drawer>
  );
}
export default PermanentDrawerLeft;
