import React, {useEffect} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '../../components/appBar';
import SideBar from '../../components/sidebar';
import { Route } from "react-router-dom";

import Dashboard from '../../pages/dashboard';
import Lending from '../../pages/lending';
import Borrowing from '../../pages/borrowing';
import Markets from '../../pages/markets';
import History from '../../pages/history';
import Liquidate from '../../pages/liquidate';



const useStyles = makeStyles(theme => ({
  root: theme.root,
  content: {
    marginTop:'100px',
    marginRight: 40,
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
          <Route path="/" component={AppBar}/>
        <SideBar></SideBar>
          <main className={classes.content}>
            <Route exact path="/" component={Dashboard}/>
            <Route path="/lending" component={Lending}/>
            <Route path="/borrowing" component={Borrowing} />
            <Route path="/markets" component={Markets} />
            <Route path="/history" component={History} />
            <Route path="/liquidate" component={Liquidate} />

          </main>
    </div>
  );
}
export default Home;