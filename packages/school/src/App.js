import React, {Fragment} from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/core';

import { store } from '../config/store';

import { LayoutDefaultConnected } from '../components/layoutDefault.layout';

ReactDOM.render(
  <Provider store={store}>
      <BrowserRouter>
        <Fragment>
          <Global
          styles={css`
        html {
          color: black;
          font-family: -apple-system,BlinkMacSystemFont,avenir next,avenir,helvetica neue,helvetica,ubuntu,roboto,noto,segoe ui,arial,sans-serif;
        }
      `}
        />
          <LayoutDefaultConnected />
        </Fragment>
      </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
