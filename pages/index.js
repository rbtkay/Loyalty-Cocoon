import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import NavigationBar from '../components/NavigationBar';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    render() {
        return (
            <div>

                <Layout />
                <NavigationBar />
                {this.renderProducts()}

            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:8000/api/product/all`);
        const products = await response.json();
        console.log("working");
        this.setState({ products });
    }

    search = async () => {
        const response = await fetch(`http://localhost:8000/api/product/search`);
        const products = await response.json();
        this.setState({ products });
    }

    renderProducts() {
        if (this.state.products.length > 0) {
            return <ProductRow products={this.state.products} />
        }
    }
}

export default Loyalty;