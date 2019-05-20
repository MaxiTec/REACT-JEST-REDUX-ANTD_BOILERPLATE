import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { App } from './containers/MyApp';
import store, { persistor } from './store/store';
import { history } from './store/history';

render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </PersistGate>,
  document.getElementById('root'),
);
