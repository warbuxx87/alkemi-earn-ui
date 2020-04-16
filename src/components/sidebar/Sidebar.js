import React from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import clsx from 'clsx';

import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import withWidth from "@material-ui/core/withWidth";
import { withStyles } from "@material-ui/core/styles";

import SidebarDashboardItem from "containers/Sidebar/DashboardItem";
import SidebarLendItem from "containers/Sidebar/LendItem";
import SidebarBorrowItem from "containers/Sidebar/BorrowItem";
import SidebarMarketsItem from "containers/Sidebar/MarketsItem";
import SidebarHistoryItem from "containers/Sidebar/HistoryItem";
import SidebarLiquidateItem from "containers/Sidebar/LiquidateItem";
import SidebarHeader from "../../containers/Sidebar/Header";

const drawerWidth = 339;

const styles = theme => ({
    drawer: {
      width: drawerWidth,
      marginLeft: 35,
      flexShrink: 0,
    },
    drawerInner: {
      overflowX: 'hidden'
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 70,
      [theme.breakpoints.up('sm')]: {
        width: 70,
      },
      '&:hover': {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },    
    drawerPaper: {
      // width: drawerWidth,
      margin: '22px 0px 0px 35px',
      background: '#202123',
      color: 'white',
    },

});

const Sidebar = ({ classes, width, variant, open }) => {
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
            <div className={classes.drawerInner}>
                <SidebarHeader />
                <List className={classes.list}>
                    <SidebarDashboardItem />
                    <SidebarLendItem />
                    <SidebarBorrowItem />
                    <SidebarMarketsItem />
                    <SidebarHistoryItem />
                    <SidebarLiquidateItem />
                </List>
            </div>
        </Drawer>
    );
};

Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
    width: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
    variant: PropTypes.string,
    open: PropTypes.bool
};

export default compose(withWidth(), withStyles(styles))(Sidebar);
