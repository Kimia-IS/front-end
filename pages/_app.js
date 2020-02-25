import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Box from '@material-ui/core/Box';
import theme from '../components/theme';
import Header from '../components/header';
import Footer from '../components/footer';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { Provider } from "react-redux";
import withRedux from "next-redux-wrapper";
import cookies from 'next-cookies';

import { makeStore } from "../store";

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    const pageProps = Component.getInitialProps
      ? await Component.getInitialProps(ctx)
      : {};

    const user = await cookies(ctx);
    // const { users } = await ctx.store.dispatch(getAllUsers());
    console.log('user in _app =', user);

    return { ...pageProps, ...{login: user} };
  }

  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }

  render() {
    console.log(this.props);
    const { Component, pageProps, store, login } = this.props;

    return (
      <React.Fragment>
        <Provider store={store}>
          <Head>
            <title>Kimia IS</title>
          </Head>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Header {...pageProps}{...{login: login}} />
            <Container>
              <Box my={12}>
                <Component {...pageProps}{...{login: login}} />
              </Box>
            </Container>
            <Footer />
          </ThemeProvider>
        </Provider>
      </React.Fragment>
    );
  }
}

export default withRedux(makeStore)(MyApp);