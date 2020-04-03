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
              <Route path={routes.home}>
                <Home/>
              </Route>
            </Switch>
        </Router>
      );
}
export default Routers;
