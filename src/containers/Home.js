import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
// import { userActions } from '../_actions';
import MainLayout from '../components/InnerLayout';

class HomePage extends React.Component {
  componentDidMount() {
    // al momento de initializa el Componente disparamos el Reducer...
    // this.props.dispatch(userActions.getAll());
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    return (
      <MainLayout location={location} title="Home :)">
        {/* <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle">
          Test
          <CustomBreadCrumb location={this.props.location} />
        </PageHeader> */}
        HOME PAGE,WELCOME
        {user.token}
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

const connectedHomePage = withRouter(connect(mapStateToProps)(HomePage));
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedHomePage as HomePage };
