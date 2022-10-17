import '../project/polyfill';
import App from 'next/app';
import Head from 'next/head';
import cookies from 'next-cookies'
import { END } from 'redux-saga';

import { UserProvider } from '@auth0/nextjs-auth0'
import { wrapper } from '../store';
import { Actions } from '../project/common';
import NetworkDetection from '../components/base/NetworkDetection';

import { ModalProvider } from '../components/base/Modal';
import { BetslipProvider } from '../components/Betslip/BetslipProvider';
import BreakPointProvider from '../components/base/BreakPointProvider';

import Layout from '../components/Layout';

import '../styles/fonts.css';
import '../styles/globals.scss';

export const MyApp = ({ Component, pageProps }) => {
    return (
        <UserProvider>
            <ModalProvider>
                <BetslipProvider>
                    <Head>
                        <meta charSet = "utf-8" />
                        <meta httpEquiv = "x-ua-compatible" content = "ie=edge" />
                        <meta name = "theme-color" content = "#317EFB" />
                        <meta
                            name = "viewport"
                            content = "width=device-width, initial-scale=1, shrink-to-fit=no"
                        />
                        <link rel = "apple-touch-icon" href = "/images/icons-192.png" />
                        <link
                            rel = "icon"
                            sizes = "192x192"
                            href = "/images/icons-192.png"
                        />
                        <link rel = "manifest" href = "/manifest.json" />
                        <link rel = "icon" href = "/images/favicon.ico" />
                        <title> Racing Post </title>
                    </Head>
                    <BreakPointProvider>
                        <NetworkDetection />
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </BreakPointProvider>
                </BetslipProvider>
            </ModalProvider>
        </UserProvider>
    )
}

MyApp.getInitialProps = wrapper.getInitialAppProps((store) => async (appContext) => {
    const { ctx, Component } = appContext;
    const { selected_bookmaker } = cookies(ctx);
    store.dispatch(Actions.initGlide());
    if (selected_bookmaker) store.dispatch(Actions.setSelectedBookmaker(selected_bookmaker));

    // Canceling sagas if Component doesn't have any page functions and its on the server
    // If component is having SSR
    // It will contain END dispatch and will END current actions as well
    if (ctx.req && !Component.isHavingSSR) {
        store.dispatch(END);

        await store.sagaTask.toPromise();
    }

    const pageProps = await App.getInitialProps(appContext);

    return { ...pageProps }
})

export default wrapper.withRedux(MyApp)
