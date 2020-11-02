import React from 'react';
import AppExtend from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from 'emotion-theming';
import moment from 'moment';

import Layout from '../components/Layout';
import theme from '../theme';

moment.locale('fr');

class App extends AppExtend {
  render() {
    const { Component, layout, pageProps } = this.props;

    const LayoutComponent = Component.Layout || layout;

    return (
      <ThemeProvider theme={theme}>
        <Provider
          session={pageProps.session}
          options={{
            clientMaxAge: 60,
            keepAlive: 5 * 60,
          }}
        >
          <LayoutComponent>
            <Component {...pageProps} />
          </LayoutComponent>
        </Provider>
      </ThemeProvider>
    );
  }
}

App.defaultProps = {
  layout: Layout,
};

export default App;
