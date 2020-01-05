import React from 'react';
import AppExtend from 'next/app';
import { ThemeProvider } from 'emotion-theming';

import theme from '../theme';
import Layout from '../components/Layout';
import Div from '../elements/Div';
import { withAuth } from '../modules/auth/auth.hoc';

class App extends AppExtend {
  render() {
    const { Component, pageProps } = this.props;

    const AuthComponent = withAuth(Component);

    return (
      <ThemeProvider theme={theme}>
        <Div style={{ fontFamily: theme.typefaces.sansSerif }} display="flex" justifyContent="center">
          <Layout>
            <AuthComponent {...pageProps} />
          </Layout>
        </Div>
      </ThemeProvider>
    );
  }
}

export default App;
