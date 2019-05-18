import {actionTypes}  from '../constants';

// EXAMPLE: Elements REDUCER
const elements = (state = [], action) => {
  switch (action.type) {
    case actionTypes.LOAD_FROM_SERVICE:
      return action.elements;
    default:
      return state;
  }
};

export default elements;
