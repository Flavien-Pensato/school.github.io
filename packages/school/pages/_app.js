import React,  {Fragment}  from 'react'
import AppExtend from 'next/app'
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Global, css } from '@emotion/core';

import { Loader } from '../components/loader.page';

import { store } from '../config/store';

class App extends AppExtend {
  componentDidMount() {
    const { autoLoginAction } = this.props;

    autoLoginAction();
  }

  handleLogout () {
    firebase.auth().signOut()
  }

  render() {
    const { Component, pageProps } = this.props

    const {
      uid, autoLoginDone,
    } = this.props;

    // if (!autoLoginDone) {
    //   return <Loader />;
    // }
    // if (!uid) {
    //   return <LoginPage />;
    // }

    return (
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
        <ToasterConnected />
        <HeaderDefaultConnected />
          <LayoutDefaultConnected />
          <Component {...pageProps} />
        </Fragment>
      </BrowserRouter>
  </Provider>

    )
  }
}

export default App
