import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import _ from 'lodash'
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        return (
            rest.auth.loggedIn === true
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
    }} />
)