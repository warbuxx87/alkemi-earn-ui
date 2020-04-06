import React, {useState, useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../components/appBar';
import SideBar from '../../components/sidebar';
import { Route } from "react-router-dom";

import Dashboard from '../../pages/dashboard';
import Connect from '../../pages/connect';
import Lending from '../../pages/lending';
import Borrowing from '../../pages/borrowing';
import Markets from '../../pages/markets';
import Liquidate from '../../pages/liquidate/liquidateNoWeb3';



const useStyles = makeStyles(theme => ({
  root: {
    margin: '10px 10px 10px 10px',
    display: 'flex',
  },
  content: {
    marginTop:'100px',
    marginLeft:'125px',
    marginRight:'100px',
    flexGrow: 1,
    padding: theme.spacing(3),
    '@media (max-width: 1380px)': {
      marginLeft:'50px!important',
      marginRight:'5px!important',
    }
  },
}));


const Home  = () => {
  useEffect(() => {
    document.title = 'Home';
  });

  const classes = useStyles();

  return (
    <div className={classes.root}>
        <CssBaseline />
          <Route exact path="/" component={AppBar}/>
          <Route path="/lending" component={AppBar}/>
          <Route path="/borrowing" component={AppBar} />
          <Route path="/markets" component={AppBar} />
          <Route path="/history" component={AppBar} />
        <SideBar></SideBar>
          <main className={classes.content}>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/lending" component={Lending}/>
            <Route path="/borrowing" component={Borrowing} />
            <Route path="/markets" component={Markets} />
            <Route path="/history" component={Liquidate} />
          </main>
    </div>
  );
}
export default Home;