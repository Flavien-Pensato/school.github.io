import React from 'react';
import AppExtend from 'next/app';
import { Provider } from 'next-auth/client';
import { ThemeProvider } from '@emotion/react';
import { SWRConfig } from 'swr';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { setStartOfWeek } from '../utils/date';

import theme from '../theme';

const currentWeek = new Date();

setStartOfWeek(currentWeek);

createStore({
  currentWeek,
});

class App extends AppExtend {
  render() {
    const { Component, layout, pageProps } = this.props;

    const LayoutComponent = Component.Layout || layout;

    return (
      <StateMachineProvider>
        <SWRConfig
          value={{
            revalidateOnMount: true,
            fetcher: (...args) => fetch(...args).then((res) => res.json()),
          }}
        >
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
        </SWRConfig>
      </StateMachineProvider>
    );
  }
}

App.defaultProps = {
  layout: ({ children }) => children,
};

export default App;
