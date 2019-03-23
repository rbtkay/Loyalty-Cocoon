import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';

class Transaction extends Component {

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br/>
                <br/>
                <br/>
                <h1>Here are Your transactions</h1>
            </div>
        )
    }
}

export default Transaction 