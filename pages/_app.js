import React from 'react';
import AppExtend from 'next/app';
import { ThemeProvider } from 'emotion-theming';
import moment from 'moment';

import theme from '../theme';
import Layout from '../components/Layout';
import Div from '../elements/Div';
import AuthProvider from '../modules/auth';

moment.locale('fr');

class App extends AppExtend {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Div style={{ fontFamily: theme.typefaces.sansSerif }} margin="auto" padding="15px" maxWidth="55rem">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </Div>
        </ThemeProvider>
      </AuthProvider>
    );
  }
}

export default App;
