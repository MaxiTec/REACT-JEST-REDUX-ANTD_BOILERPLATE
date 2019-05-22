import React from 'react';
import {
  Switch, Route, withRouter, Link,
} from 'react-router-dom';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom'
// import { history } from '../store/store';
import { Alert } from 'antd';
import { alertActions } from '../actions/alert-actions';
import { PrivateRoute } from '../components/privateRoute';
import { HomePage } from './Home';
import { LoginPage } from './login';
import { Test } from './Test';
import CustomBreadCrumb from '../components/CustomBreadCrumb';
// import { RegisterPage } from '../RegisterPage';
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    // console.log(history)
    // const { dispatch } = this.props;
    // escuchamos siempre en cada cambio de pagina, y limpiamos las alertas.
    // this.props.history.listen((location, action) => {
    //     console.log(location,action)
    //     dispatch(alertActions.clear());
    // });
  }

  render() {
    const { location } = this.props;
    const { alert, login } = this.props;
    return (
      <div className="container">
        {alert.message && <Alert message={alert.message} type="warning" closable />}
        <Switch>
          <PrivateRoute exact path="/" breadcrumbName="Home" component={HomePage} auth={login} />
          <Route
            path="/login"
            render={props => <LoginPage breadcrumbName="login" {...props} />}
            auth={login}
          />
          <Route exact path="/test" breadcrumbName="test" component={Test} auth={login} />
          <Route
            exact
            path="/test/:id"
            breadcrumbName="otro"
            component={() => <div>/test/otro</div>}
            auth={login}
          />
          {/* <Route path="/register" component={RegisterPage} /> */}
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const {
    elements, message, login, alert,
  } = state;
  // const { loggedIn,user } = login;
  return {
    elements,
    message,
    login,
    alert,
  };
};
const connectedApp = withRouter(connect(mapStateToProps)(App));
export { connectedApp as App };
