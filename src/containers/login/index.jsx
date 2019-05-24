import React from 'react';
import { Formik } from 'formik';
import { Spin } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import DisplayBookingForm from '../../components/LoginForm';
import { userActions } from '../../actions/user-actions';

const timeFormat = 'h:mm A';
const initialValues = {
  username: '',
  password: '',
};
const SignupSchema = Yup.object().shape({
  username: Yup.string().required('Requerido'),
  password: Yup.string().required('Requerido'),
});
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // reset login status, just in Case :)
    // this.props.dispatch(userActions.logout());
    this.state = {
      username: '',
      password: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formProps, actions) {
    const {
      username, password
    } = formProps;
    console.log( username, password);
    const { dispatch } = this.props;
    dispatch(userActions.login(username, password))
      .then((ele) => {
        console.log('Paso el Login');
      })
      .catch((error) => {
        console.log(error)
        // this.props.form.setFields({
        //   username: {
        //     errors: [new Error('forbid ha')],
        //   },
        // });
      });
  }
  // handleSubmit(e) {
  //   console.log(e);
  //   e.preventDefault();
  //   this.props.form.validateFields((err, values) => {
  //     if (!err) {
  //       const { dispatch } = this.props;
  //       dispatch(userActions.login(values.username, values.password))
  //         .then((ele) => {
  //           console.log('Paso el Login');
  //         })
  //         .catch((ele) => {
  //           console.log(ele);
  //           this.props.form.setFields({
  //             username: {
  //               // value: values.username,
  //               errors: [new Error('forbid ha')],
  //             },
  //           });
  //         });
  //       console.log('Received values of form: ', values);
  //     } else {
  //       console.log(err);
  //     }
  //   });
  // }
  render() {
    const { loggingIn } = this.props;
    console.log(this.props);
    return (
      <div className="col-md-6 col-md-offset-3">
        <h2>Login</h2>
        <Spin spinning={loggingIn} tip="Cargando...">
          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={this.handleSubmit}
            render={DisplayBookingForm}
          />
        </Spin>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { loggingIn } = state.login;
  return {
    loggingIn,
  };
}
const connectedLoginPage = withRouter(connect(mapStateToProps)(LoginPage));
export { connectedLoginPage as LoginPage };
