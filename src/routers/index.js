import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { routes } from './routes';
import Home from '../pages/home';


const Routers = () => {
    return (
        <Router>

            <Switch>
              <Route path={routes.dashboard}>
                <Home breadcrumb={'Home'}/>
              </Route>
              <Route path={routes.lending}>
                <Home breadcrumb={'Lending'}/>
              </Route>
              <Route path={routes.borrowing}>
                <Home breadcrumb={'Borrowing'}/>
              </Route>
              <Route path={routes.markets}>
                <Home breadcrumb={'Markets'}/>
              </Route>
            </Switch>
        </Router>
      );
}
export default Routers;
