import React, { Component } from 'react';
import Head from 'next/head';

class Layout extends Component {

    render() {
        return (
            <Head>
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
}

export default Layout;