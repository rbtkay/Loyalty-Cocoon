import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';

class Transaction extends Component {

    static async getInitialProps(props) {

        // try {
        const response = await fetch(`http://localhost:8000/api/product/offered`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        const products = await response.json();

        if (response.status === 401) {
            console.log('redirecting...');
            Router.push('/');
        }

        console.log(products);

        // } catch (err) {

        //FIXME: no Router instance found. when altering the url manually.
        // Router.pushRoute('/');
        // }

        return { props };
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