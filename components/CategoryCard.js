import React, { Component } from 'react';
import { Card, Segment } from 'semantic-ui-react';
import ProductCard from '../components/ProductCard';

class CategoryCard extends Component {
    render() {
        return (
            <div>
                <Card.Group centered>
                    {this.renderProducts()}
                </Card.Group>
            </div>
        )
    }

    renderProducts() {
        const { products } = this.props;

        if (products) {
            return products.map((object) => {
                return (
                    <ProductCard
                        handleSuccess={this.props.handleSuccess}
                        key={object["product_id"] + object["product_name"]}
                        id={object["product_id"]}
                        name={object["product_name"]}
                        description={object["product_description"]}
                        vendor={object["vendor_username"]}
                        priceLoco={object["product_loco"] + " Loco"}
                        category={object["product_category"]}
                    />
                );
            })
        }
    }
}

export default CategoryCard;