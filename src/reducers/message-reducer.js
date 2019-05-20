import { actionTypes } from '../constants/actions-types';

const message = (state = 'Hello World!', action) => {
  switch (action.type) {
    case actionTypes.UPDATE_MESSAGE: {
      return action.message;
    }
    default:
      return state;
  }
};

export default message;
