import React from 'react';
import AppExtend from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ChakraProvider } from '@chakra-ui/react';
import { SWRConfig } from 'swr';
import { StateMachineProvider, createStore } from 'little-state-machine';
import { setStartOfWeek } from '../utils/date';
import fetcher from '../utils/fetch';

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
      <ChakraProvider>
        <StateMachineProvider>
          <SWRConfig
            value={{
              revalidateOnMount: true,
              fetcher,
            }}
          >
            <SessionProvider session={pageProps.session} refetchInterval={0}>
              <LayoutComponent>
                <Component {...pageProps} />
              </LayoutComponent>
            </SessionProvider>
          </SWRConfig>
        </StateMachineProvider>
      </ChakraProvider>
    );
  }
}

App.defaultProps = {
  layout: ({ children }) => children,
};

export default App;
