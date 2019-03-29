import React, { Component } from 'react';
import { Card, Button, Grid } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import ProductCard from '../../components/ProductCard';
import ProductRow from '../../components/ProductRow';
import NavigationBar from '../../components/NavigationBar';
import { Router } from '../../routes';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filter: "all",
            loading: false
        };
    }

    propsNavigation = (filter) => {
        this.setState({ filter });
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar propsNavigation={this.propsNavigation} />
                <br /><br /><br /><br /><br />
                <ProductRow />
                <br />
                <Button loading={this.state.loading} onClick={this.onClick} color="violet">Send Me Points!</Button>
            </div>
        );
    }
}

export default Loyalty;