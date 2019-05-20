import storage from 'redux-persist/lib/storage';
import { persistCombineReducers } from 'redux-persist';
import login from './login-reducer';
import elements from './elements-reducer';
import message from './message-reducer';
import alert from './alert-reducer';

const config = {
  key: 'login',
  storage,
  whitelist: ['login'],
};
const rootReducer = persistCombineReducers(config, {
  login,
  elements,
  alert,
  message,
});

export default rootReducer;
