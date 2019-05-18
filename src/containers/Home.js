import React from 'react';
import { Link ,withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// import { userActions } from '../_actions';

class HomePage extends React.Component {
    componentDidMount() {
        //al momento de initializa el Componente disparamos el Reducer...
        // this.props.dispatch(userActions.getAll());
    }

    // handleDeleteUser(id) {
    //     return (e) => this.props.dispatch(userActions.delete(id));
    // }

    render() {
        const { user } = this.props;
        return (
            <div>
                HOME PAGE,WELCOME {user.nombre}
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { login } = state;
    // const { users, login } = state;
    const { user } = login;
    return {
        user
    };
}

const connectedHomePage =  withRouter(connect(mapStateToProps)(HomePage))
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedHomePage as HomePage };