import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { persistStore } from 'redux-persist';
import rootReducer from '../reducers';

const loggerMiddleware = createLogger();
const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, loggerMiddleware));
// store.dispatch(actionLoadElements())
export const persistor = persistStore(
  store,
  undefined,
  //     () => {
  //     store.dispatch(pageLoaded())
  //   }
);
export default store;
