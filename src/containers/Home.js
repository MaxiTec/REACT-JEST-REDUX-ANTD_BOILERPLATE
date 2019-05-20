import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
// import { userActions } from '../_actions';

class HomePage extends React.Component {
  componentDidMount() {
    // al momento de initializa el Componente disparamos el Reducer...
    // this.props.dispatch(userActions.getAll());
  }

  // handleDeleteUser(id) {
  //     return (e) => this.props.dispatch(userActions.delete(id));
  // }

  render() {
    const { user } = this.props;
    return (
      <div>
        HOME PAGE,WELCOME
        {' '}
        {user.nombre}
        <Link to="/otro-lugar">LINK</Link>
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { login } = state;
  const { user } = login;
  return {
    user,
  };
}

const connectedHomePage = withRouter(connect(mapStateToProps)(HomePage));
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedHomePage as HomePage };
