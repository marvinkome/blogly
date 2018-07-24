import React from 'react';

import NProgress from 'nprogress';
import Router from 'next/router';

import firebase from 'firebase';
import App, { Container } from 'next/app';
import { ApolloProvider } from 'react-apollo';

import withApolloClient from '../components/hoc/withApollo';

import { initGA, logPageView } from '../lib/analytics';
import { checkLoggedIn } from '../lib/helpers';

import 'materialize-css/dist/css/materialize.min.css';
import '../style/index.less';

if (typeof window !== 'undefined') {
    require('materialize-css/dist/js/materialize.min.js');
}

!firebase.apps.length &&
    firebase.initializeApp({
        apiKey: process.env.FIREBASE_AUTH,
        authDomain: 'reactpress-48581.firebaseapp.com',
        databaseURL: 'https://reactpress-48581.firebaseio.com',
        projectId: 'reactpress-48581',
        storageBucket: 'reactpress-48581.appspot.com',
        messagingSenderId: process.env.FIREBASE_MESSAGING
    });

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

class InitApp extends App {
    static async getInitialProps({ Component, ctx }) {
        let pageProps = {};

        if (Component.getInitialProps) {
            pageProps = await Component.getInitialProps(ctx);
        }

        // const loggedIn = false;
        const { loggedInUser } = await checkLoggedIn(ctx.apolloClient);

        pageProps = {
            ...pageProps,
            loggedIn: loggedInUser.user ? true : false
        };

        return {
            pageProps
        };
    }

    componentDidMount() {
        if (process.env.NODE_ENV === 'production') {
            if (!window.GA_INITIALIZED) {
                initGA();
                window.GA_INITIALIZED = true;
            }
            logPageView();
        }
    }

    render() {
        const { Component, pageProps, apolloClient } = this.props;
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Component {...pageProps} error={pageProps.error} />
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApolloClient(InitApp);
