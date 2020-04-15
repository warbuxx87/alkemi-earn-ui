import React from "react";
import PropTypes from "prop-types";


import withWidth, { isWidthUp } from "@material-ui/core/withWidth";

import AppBarTitle from "../../containers/AppBar/Title";
import AppBarIconButton from "../../containers/AppBar/IconButton";
import { makeStyles, createStyles } from '@material-ui/core/styles';

import Toolbar from "@material-ui/core/Toolbar";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';

const styles = makeStyles(() =>
  createStyles({
  toolbar:{
    padding:'24px 19px',
  },
  headerLeft:{
    paddingTop:'10px',
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
  notification:{
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '5px',
  },
  btnActiveOutline:{
    display:'flex',
    width: '150px',
    height: '36px',
    justifyContent:'center',
    border: '1px solid #FFFFFF',
    borderRadius: '100px',
    opacity: '1',
    marginTop:'25px',
    color: 'white',
  },
  statusBadge:{
    background: 'green',
    width: '9px',
    height: '9px',
    borderRadius : '5px',
    marginRight:'12px'
  },
  bell:{
    paddingTop: '32px',
    paddingRight: '15px',
  }

}));

const classes = styles;


const AppBarToolbar = ({ width, shifted }) => (
    <Toolbar disableGutters={!shifted || isWidthUp("md", width)}>
        <AppBarIconButton />
        <AppBarTitle />
          <Grid container>
            <Grid item md={6}  className={classes.headerLeft}>
                <Grid item md={12} className={classes.overview}>OVERVIEW</Grid>
                <Grid item md={12} className={classes.current}></Grid>
            </Grid>
            <Grid item md={6} className={classes.notification}>
                <Grid className={classes.bell}> <NotificationsNoneIcon/></Grid>
                  <Grid>
                    <Button type="button" className={classes.btnActiveOutline} variant="outlined" color="secondary.dark" >
                    <Grid className={classes.statusBadge}></Grid>
                    <Grid className={classes.connect} >
                      0x121565...6456
                      {/*account ? account  : 'Connect' */}
                    </Grid>
                  </Button>
                  </Grid>

                </Grid>
            </Grid>
    </Toolbar>
);

AppBarToolbar.propTypes = {
    width: PropTypes.string.isRequired,
    shifted: PropTypes.bool
};

export default withWidth()(AppBarToolbar);
