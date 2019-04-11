import React, { Component } from 'react';
import Head from 'next/head';

class Layout extends Component {

    render() {
        return (
            <Head>
                <meta name='viewport' content='width=device-width, initial-scale=1.0' />
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
                />
            </Head>
        );
    }
}

export default Layout;