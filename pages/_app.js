import React, { Fragment } from 'react';
import AppExtend from 'next/app';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/core';

import Layout from '../components/layout';

import { store } from '../config/store';

class App extends AppExtend {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Fragment>
          <Global
            styles={css`
              html {
                color: black;
                font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu,
                  roboto, noto, segoe ui, arial, sans-serif;
              }
            `}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </Fragment>
      </Provider>
    );
  }
}

export default App;
