import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';

import { store } from './config/store';

import { LayoutDefaultConnected } from './views/layouts/layoutDefault.layout';
import { ToasterConnected } from './modules/display/components/toaster.connector';

import './main.css';

moment.locale('fr');

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <div>
        <ToasterConnected />
        <LayoutDefaultConnected />
      </div>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
