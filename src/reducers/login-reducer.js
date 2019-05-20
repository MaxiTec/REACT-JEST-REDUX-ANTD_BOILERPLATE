import { loginTypes } from '../constants';

const INITIAL_STATE = { loggingIn: false, loggedIn: false };
const login = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case loginTypes.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user,
      };
    case loginTypes.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case loginTypes.LOGIN_ERROR:
      return INITIAL_STATE;
    case loginTypes.LOGOUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default login;
