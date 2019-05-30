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
// import { Test } from './Test';
import ListaTour from './tours';
import '../static/styles/index.css';
import { isEmpty } from 'lodash';

const propTypes = {
  clearMessage: PropTypes.func.isRequired,
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '...',
      link: '',
      button: false,
      changeTitle: (title) => {
        this.setState({
          title,
        });
      },
      setRouteBtn: (link) => {
        this.setState({
          link,
        });
      },
      signOut: () => {
        this.props.signOut();
      },
    };
    // escuchamos siempre en cada cambio de pagina, y limpiamos las alertas.
    // this.props.history.listen((location, action) => {
    //   // if (!isEmpty(this.props.alert)) {
    //   //   this.props.clearMessage();
    //   // }
    // });
  }

  // compara Las props anteriores con las nuevas.
  componentWillReceiveProps(newProps) {
    console.log(newProps.location.pathname, this.props.location.pathname);
    if (newProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        title: '',
        link: '',
      });
    }
  }

  /* componentDidUpdate Verifica que todos los hijos ya se hayan Actualizado */
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      if (!isEmpty(this.props.alert)) {
        this.props.clearMessage();
      }
    }
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
          <Route path="/login" component={LoginPage} />
          <PrivateRoute exact path="/dashboard" component={HomePage} auth={login} />
          {/* Rutas de Prueba */}
          <PrivateRoute exact path="/tours" component={ListaTour} auth={login} />
          <PrivateRoute exact path="/tours/editar/:id" component={ListaTour} auth={login} />
          {/* <PrivateRoute exact path="/tours/agregar" component={ListaTour} auth={login} />
          <PrivateRoute exact path="/categorias-tour" component={ListaTour} auth={login} />
          <PrivateRoute exact path="/paquetes-tour" component={ListaTour} auth={login} />
          <PrivateRoute exact path="/tarifas-tour" component={ListaTour} auth={login} /> */}
          <Route component={() => <div>Error 404: No se encontró la página</div>} />
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
