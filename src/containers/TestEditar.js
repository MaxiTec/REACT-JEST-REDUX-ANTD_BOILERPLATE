import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from '../components/AppContext';
class TestEditar extends React.Component {
  constructor(props,context) {
    super(props);
  }
  componentWillMount() {
    this.context.changeTitle('Editar Tests');
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    return <div>Informacion del Test a editar</div>;
  }
}

function mapStateToProps(state) {
  const { login } = state;
  const { user } = login;
  return {
    user,
  };
}
TestEditar.contextType = AppContext;
const connectedTest = withRouter(connect(mapStateToProps)(TestEditar));
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedTest as TestEditar };
