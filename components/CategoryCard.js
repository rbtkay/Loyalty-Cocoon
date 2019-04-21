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
                    <Grid.Row key={divisionProduct.indexOf(object)} columns={4}>
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
        return object.map((item, index) => {
            return (
                <Grid.Column key={item.product_id}>
                    <ProductCard
                        handleSuccess={this.props.handleSuccess}
                        key={item["product_id"]}
                        id={item["product_id"]}
                        name={item["product_name"]}
                        description={item["product_description"]}
                        vendor={item["user_username"]}
                        priceLoco={item["product_loco"] + " Loco"}
                        category={item["product_category"]}
                    />
                </Grid.Column>
            );
        })
    }
}

export default CategoryCard;