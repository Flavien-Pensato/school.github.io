import React from 'react';
import { Global, css } from '@emotion/core';
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <script src="https://kit.fontawesome.com/68f3b8a9e2.js" crossOrigin="anonymous" />
          <Global
            styles={css`
              body {
                font-family: system-ui, sans-serif;
                font-weight: 400;
                line-height: 1.5;
                max-width: 55rem;
                margin: auto;
              }
            `}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
