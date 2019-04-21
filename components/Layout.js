import React, { Component } from 'react';
import Head from 'next/head';
import MetaTags from 'react-meta-tags';
import ReactGA from 'react-ga';

class Layout extends Component {

    render() {

        return (
            <Head>
                <MetaTags>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                </MetaTags>
                <noscript>
                    <br /> <br />
                    <h1>You need to enable JavaScript to run this app.</h1>
                </noscript>
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
                />
            </Head>
        );
    }

    componentDidMount() {
        ReactGA.initialize('UA-138219487-1');
        let href = window.location.href;
        let gaLink = href.slice(href.indexOf('/')[2]);

        ReactGA.pageview(`/${gaLink}`);
    }
}

export default Layout;