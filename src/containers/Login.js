import React from 'react';
import { Formik } from 'formik';
import { Spin } from 'antd';
import moment from 'moment';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as Yup from 'yup';
import DisplayBookingForm from '../components/LoginForm/LoginForm';
import './Login.styl';
import { userActions } from '../actions/user-actions';

const dateFormat = 'MM-DD-YYYY';
const timeFormat = 'h:mm A';
const initialValues = {
  bookingClient: '',
  bookingDate: moment(Date.now()),
  bookingTime: moment(Date.now()),
  selectOptions: ['Mark', 'Bob', 'Anthony'],
  checkboxName: false,
};
const SignupSchema = Yup.object().shape({
  email: Yup.string().required('Requerido'),
  bookingClient: Yup.string().required('Requerido'),
  bookingDate: Yup.date()
    .required('Requerido')
    .min(
      moment(new Date())
        .add(1, 'days')
        .toDate(),
      'La fecha debe ser a futuro',
    ),
});
class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    // reset login status, just in Case :)
    // this.props.dispatch(userActions.logout());
    this.state = {
      username: '',
      password: '',
      submitted: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(formProps, actions) {
    const {
      bookingClient, bookingDate, bookingTime, email, checkboxName,
    } = formProps;
    const selectedDate = moment(bookingDate).format(dateFormat);
    const selectedTime = moment(bookingTime).format(timeFormat);
    console.log(bookingClient, email, selectedDate, selectedTime, checkboxName);
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
