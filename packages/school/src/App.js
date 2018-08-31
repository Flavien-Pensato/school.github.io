import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './config/store';

import { LayoutDefaultConnected } from './views/layouts/layoutDefault.layout';

import './main.css';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <LayoutDefaultConnected />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
