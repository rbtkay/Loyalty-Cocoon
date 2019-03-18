import React, { Component } from 'react';
import Head from 'next/head';

class Layout extends Component {

    render() {
        return (
            <Head>
                <link
                    rel="stylesheet"
                    href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.1/dist/semantic.min.css"
                />
            </Head>
        );
    }
}

export default Layout;
