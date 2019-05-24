import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import MainLayout from './InnerLayout/test2'
const DashboardLayout = ({ children, ...rest }) => (
  <div className="page page-dashboard">
    <div className="sidebar">This is the Second Layout</div>
    <div className="main">{children}</div>
  </div>
);
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
