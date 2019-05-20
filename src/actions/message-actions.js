import { actionTypes } from '../constants/actions-types';

const updateMessage = () => ({
  type: actionTypes.UPDATE_MESSAGE,
  message: 'Hola Mundo 2!',
});

export default updateMessage;
