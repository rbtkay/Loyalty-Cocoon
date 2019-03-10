import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            productData: []
        };
    }

    render() {
        return (
            <div>
  
                <Layout />

                {this.renderProducts()}

            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch(`http://localhost:8000/api/product/all`);
        const productData = await response.json();
        this.setState({ productData });
    }

    renderProducts() {
        if (this.state.productData.length > 0) {
            return <ProductRow products={this.state.productData} />
        }
    }
}

export default Loyalty;