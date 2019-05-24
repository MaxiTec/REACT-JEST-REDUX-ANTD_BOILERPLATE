import React from 'react';
import {
  Switch, Route, withRouter, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Alert from '../components/Alert';
import AppContext from '../components/AppContext';
import { alertActions } from '../actions/alert-actions';
import { userActions } from '../actions/user-actions';
// Podemos Llamar Las Paginas Asincronamente...
import { PrivateRoute } from '../components/privateRoute';
import { HomePage } from './Home';
import { LoginPage } from './login';
import { Test } from './Test';
import { TestEditar } from './TestEditar';
import '../static/styles/index.css';
import LoginLayout from '../components/InnerLayout/LoginLayout';

const propTypes = {
  clearMessage: PropTypes.func.isRequired,
};
class App extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      title: '...',
      button: false,
      changeTitle: (title) => {
        this.setState({
          title,
        });
      },
      signOut: () => {
        this.props.signOut()
      },
    };
    // const { dispatch } = this.props;
    // escuchamos siempre en cada cambio de pagina, y limpiamos las alertas.
    this.props.history.listen((location, action) => {
      console.log(location, action);
      this.setState({
        title: '',
      });
      this.props.clearMessage()
    });
  }

  render() {
    const { alert, login } = this.props;
    return (
      <AppContext.Provider value={this.state}>
        {alert.message && (
          <Alert message={alert.message} type={alert.type} clearMessage={this.props.clearMessage} />
        )}
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/dashboard" />} />
          <LoginLayout path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={HomePage} auth={login} />
          <PrivateRoute exact path="/test" component={Test} auth={login} />
          <PrivateRoute exact path="/test/:id" component={TestEditar} auth={login} />
        </Switch>
      </AppContext.Provider>
    );
  }
}
App.propTypes = propTypes;
App.contextType = AppContext;
const mapStateToProps = (state) => {
  const { elements, login, alert } = state;
  return {
    elements,
    login,
    alert,
  };
};
const mapDispatchToProps = dispatch => ({
  clearMessage() {
    dispatch(alertActions.clear());
  },
  signOut() {
    dispatch(userActions.logout());
  },
});
const connectedApp = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(App),
);
export { connectedApp as App };
