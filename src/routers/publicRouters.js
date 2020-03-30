import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { routes } from './routes';
const PublicRouteters = ({breadcrumb, component, isLoggedIn, ...rest }) => {
    const Component = component;  
    return (
        <Route
          {...rest}
          render={props =>
            !isLoggedIn ? (
              <Component breadcrumb={breadcrumb} {...props}/>
            ) 
            : (
              <Redirect to={routes.marketForecast} />
            )
          }
        />
    );
};

export default PublicRouteters;