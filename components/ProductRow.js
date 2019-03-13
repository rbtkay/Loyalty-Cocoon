import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card } from 'semantic-ui-react';

class ProductRow extends Component {

    render() {
        const { products } = this.props;
        if (products) {
            return (
                <Card.Group>
                    {this.renderProducts(products)}
                </Card.Group>
            );
        } else {
            return <div>Loading Products...</div>
        }
    }

    renderProducts(products) {
        if (products) {
            return products.map((object) => {
                return (
                    <ProductCard
                        key={object["product_id"]}
                        name={object["product_name"]}
                        description={object["vendor_username"]}
                        price={object["product_price"] + " Loco"}
                    />
                );
            })
        }
    }
}

export default ProductRow;
