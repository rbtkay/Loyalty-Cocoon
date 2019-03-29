import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import ProductRow from '../../components/ProductRow';
import NavigationBar from '../../components/NavigationBar';
import { Router } from '../../routes';
import session from 'express-session';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filter: "all",
            account: '',
            balance: 0,
            loading: false
        };
    }


    render() {
        { console.log(this.state.products) }
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br /><br /><br /><br /><br />
                <ProductRow />
                <br />
                <Button loading={this.state.loading} onClick={this.onClick} color="violet">Send Me Points!</Button>
            </div>
        );
    }
}

export default Loyalty;
