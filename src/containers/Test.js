import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AppContext from '../components/AppContext';

class Test extends React.Component {
  constructor(props, context) {
    super(props);
  }

  componentDidMount() {
    this.context.changeTitle('Listado de tests');
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    return (
      <div>
        LISTA DE ALGO
        <p>Link para editar</p>
        <Link to={`/test/${2}`}>Test/2</Link>
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
Test.contextType = AppContext;
const connectedTest = withRouter(connect(mapStateToProps)(Test));
export { connectedTest as Test };
