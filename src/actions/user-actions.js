import { loginTypes } from '../constants';
import { userService } from '../services/user-services';
import { alertActions } from './alert-actions';
import { history } from '../store/history';

export const userActions = {
  login,
  logout,
  register,
  getAll,
  delete: _delete,
};

function login(username, password) {
  return (dispatch) => {
    dispatch(request({ username }));
    return userService
      .login(username, password)
      .then((user) => {
        const { data } = user;
        dispatch(success(data));
        history.push('/');
        dispatch(alertActions.success('Login Success'));
        return Promise.resolve();
      })
      .catch((error) => {
        dispatch(failure(JSON.stringify(error)));
        dispatch(alertActions.error(JSON.stringify(error)));
        return Promise.reject(error);
      });
  };
  function request(user) {
    return { type: loginTypes.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: loginTypes.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: loginTypes.LOGIN_ERROR, error };
  }
}

function logout() {
  return { type: loginTypes.LOGOUT };
}

function register(user) {
  return (dispatch) => {
    dispatch(request(user));
    userService.register(user).then(
      (user) => {
        dispatch(success());
        history.push('/login');
        dispatch(alertActions.success('Registration successful'));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      },
    );
  };

  function request(user) {
    return { type: loginTypes.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: loginTypes.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: loginTypes.REGISTER_FAILURE, error };
  }
}

function getAll() {
  return (dispatch) => {
    dispatch(request());

    userService
      .getAll()
      .then(users => dispatch(success(users)), error => dispatch(failure(error.toString())));
  };

  function request() {
    return { type: loginTypes.GETALL_REQUEST };
  }
  function success(users) {
    return { type: loginTypes.GETALL_SUCCESS, users };
  }
  function failure(error) {
    return { type: loginTypes.GETALL_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService
      .delete(id)
      .then(user => dispatch(success(id)), error => dispatch(failure(id, error.toString())));
  };

  function request(id) {
    return { type: loginTypes.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: loginTypes.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: loginTypes.DELETE_FAILURE, id, error };
  }
}
