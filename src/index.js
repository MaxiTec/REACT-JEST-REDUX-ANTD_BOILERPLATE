import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { PersistGate } from 'redux-persist/integration/react';
import { LocaleProvider } from 'antd';
// Nota: En produccion Habilitar El idioma en Webpack
import es_Es from 'antd/lib/locale-provider/es_Es';
import moment from 'moment';
import { App } from './containers/MyApp';
import store, { persistor } from './store/store';
import { history } from './store/history';
import 'moment/locale/es';

moment.locale('es');
render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <Router history={history}>
        <LocaleProvider locale={es_Es}>
          <App />
        </LocaleProvider>
      </Router>
    </Provider>
  </PersistGate>,
  document.getElementById('root'),
);
