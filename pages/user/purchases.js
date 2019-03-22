import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';

class Purchases extends Component {

    // static async getInitialProps(props){

    // }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <h1>Here Are your Purchases</h1>
            </div>
        );
    }
}

export default Purchases;