import {loginTypes}  from '../constants';
const INITIAL_STATE={}
const login= (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case loginTypes.LOGIN_REQUEST:
        return {
          loggingIn: true,
          user: action.user
        };
      case loginTypes.LOGIN_SUCCESS:
        return {
          loggedIn: true,
          user: action.user
        };
      case loginTypes.LOGIN_FAILURE:
        return {};
      case loginTypes.LOGOUT:
        return {};
      default:
        return state
    }
  }

export default login;
