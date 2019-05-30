import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainLayout from './InnerLayout';

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props => (rest.auth.loggedIn === true ? (
      <MainLayout>
        <Component {...props} />
      </MainLayout>
    ) : (
      <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
    ))
    }
  />
);
