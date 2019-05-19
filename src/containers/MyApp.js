import React from 'react';
import { Switch, Route ,withRouter} from 'react-router-dom';
import { Alert } from 'antd';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom'
// import { history } from '../store/store';
import { alertActions } from '../actions/alert-actions';
import { PrivateRoute } from '../components/privateRoute';
import { HomePage } from '../containers/Home';
import { LoginPage } from '../containers/Login';
// import { RegisterPage } from '../RegisterPage';
class App extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        // console.log(history)
        // const { dispatch } = this.props;
        //escuchamos siempre en cada cambio de pagina, y limpiamos las alertas.
        // this.props.history.listen((location, action) => {
        //     console.log(location,action)
        //     dispatch(alertActions.clear());
        // });
    }

    render() {
        const { alert,login } = this.props;
        return (
            <div className="jumbotron">
                <div className="container">
                    <div className="col-sm-8 col-sm-offset-2">
                        {alert.message &&
                            // <div className={`alert ${alert.type}`}>{alert.message}</div>
                            <Alert
                            message={alert.message}
                            type="warning"
                            closable
                            // onClose={onClose}
                          />
                        }
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage} auth={login} />
                            <Route path="/login" component={LoginPage} auth={login}/>
                            {/* <Route path="/register" component={RegisterPage} /> */}
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    const {elements, message, login, alert} =state
    // const { loggedIn,user } = login;
    return({elements,message,login,alert});}
const connectedApp =  withRouter(connect(mapStateToProps)(App))
// export default withRouter(connect(mapStateToProps)(App))
export { connectedApp as App }; 