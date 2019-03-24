import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';

class Transaction extends Component {

    getInitialProps(req) {
        const user = req.userData;
        console.log("User" + user);
        return { user };
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <h1>Here are Your transactions, {this.props.user}</h1>
            </div>
        )
    }
}

export default Transaction 