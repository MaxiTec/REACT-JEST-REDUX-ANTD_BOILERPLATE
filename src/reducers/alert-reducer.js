import { alertTypes } from '../constants';

const alert = (state = {}, action) => {
  switch (action.type) {
    case alertTypes.SUCCESS:
      return {
        type: 'success',
        message: action.message,
      };
    case alertTypes.ERROR:
      return {
        type: 'error',
        message: action.message,
      };
    case alertTypes.CLEAR:
      return {};
    default:
      return state;
  }
};
export default alert;
