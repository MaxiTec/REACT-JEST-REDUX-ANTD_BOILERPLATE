import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import MainLayout from '../components/InnerLayout';

class Test extends React.Component {
  componentDidMount() {
    // al momento de initializa el Componente disparamos el Reducer...
    // this.props.dispatch(userActions.getAll());
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    return (
      <MainLayout location={location} title="Test" button="/bye">
        <Link to={`/test/${2}`}>Test/2</Link>
      </MainLayout>
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

const connectedTest = withRouter(connect(mapStateToProps)(Test));
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedTest as Test };
