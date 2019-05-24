import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Skeleton } from 'antd';
import axios from 'axios';
import AppContext from '../components/AppContext';
// import { userActions } from '../_actions';
class HomePage extends React.Component {
  constructor(props, context) {
    super(props);
    this.state = {
      data: [],
      loading: true,
    };
  }

  componentDidMount() {
    this.context.changeTitle('Home');
    axios.get('https://reqres.in/api/users?page=2').then((ele) => {
      const { data } = ele;
      this.setState({
        data: data.data,
        loading: false,
      });
    });
  }

  render() {
    const { user } = this.props;
    const { location } = this.props;
    return (
      <div>
        {this.state.loading ? (
          <div>
            <Skeleton avatar paragraph={{ rows: 8 }} />
          </div>
        ) : (
          <ul>
            {this.state.data.map(ele => (
              <li key={ele.id}>{ele.first_name}</li>
            ))}
          </ul>
        )}
        {/* {user.token} */}
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
HomePage.contextType = AppContext;
const connectedHomePage = connect(mapStateToProps)(HomePage);
// const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage))
export { connectedHomePage as HomePage };
