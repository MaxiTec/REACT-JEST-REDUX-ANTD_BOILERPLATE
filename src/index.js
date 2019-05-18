import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {App} from './containers/MyApp';
import store from './store/store';
// import { Router } from 'react-router-dom';
import {Router, Route} from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react'
import { history} from './store/history'
import { persistor } from './store/store'
// import { history } from './store/store';
render(
  <PersistGate loading={null} persistor={persistor}>
  <Provider store={store}>
  <Router history={history}>
    <App />
  </Router>
  </Provider>
  </PersistGate>
  ,
  document.getElementById('root'),
);
