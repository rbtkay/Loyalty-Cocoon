import React, { Component } from 'react';
import { Card, Segment, Grid } from 'semantic-ui-react';
import ProductCard from '../components/ProductCard';

class CategoryCard extends Component {
    render() {
        return (
            <Grid>
                {this.renderProducts()}
            </Grid>
        )
    }

    renderProducts() {
        const { products } = this.props;

        if (products) {
            const divisionProduct = this.divide(products);
            return divisionProduct.map((object) => {
                return (
                    <Grid.Row columns={4}>
                        {this.renderDivision(object)}
                    </Grid.Row>
                );
            })
        }
    }

    divide(products) {
        var temporal = [];
        for (var i = 0; i < products.length; i += 4) {
            temporal.push(products.slice(i, i + 4));
        }
        return temporal;
    }

    renderDivision(object) {
        return object.map((object) => {
            return (
                <Grid.Column>
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
                </Grid.Column>
            );
        })
    }
}

export default CategoryCard;