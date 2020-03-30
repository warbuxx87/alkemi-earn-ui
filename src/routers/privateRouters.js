import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from './routes';
const PrivateRoute = ({breadcrumb, component, isLoggedIn, ...rest }) => {
    const Component = component; 
    return (
        <Route
          {...rest}
          render={props =>
            isLoggedIn ? (
              <Component breadcrumb={breadcrumb} {...props}/>
            ) 
            : (
              <Redirect to={routes.login} />
            )
          }
        />
    );
};

export default PrivateRoute;