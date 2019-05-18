import actionLoadElements from '../actions/elements-actions';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';
// import storage from 'redux-persist/lib/storage'
//Peristencia de datos en el store para el Login
import { persistStore } from 'redux-persist'
const loggerMiddleware = createLogger();
 const store = createStore(
    rootReducer,
    applyMiddleware(
        thunkMiddleware,
        loggerMiddleware
    )
);
// store.dispatch(actionLoadElements())
export default store
export const persistor = persistStore(store, undefined 
//     () => { 
//     store.dispatch(pageLoaded()) 
//   }
  )