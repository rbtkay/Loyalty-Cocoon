import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card, CardGroup, Grid, GridColumn } from 'semantic-ui-react';
import { Router } from '../routes';

class ProductRow extends Component {
    state = {
        products: [],
        topDeals: [],
        recommended: [],
        bestSeller: [],
        filter: "all"
    }

    render() {
        if (this.state.products.length > 0) {
            return (
                <Grid>
                    <h1>Top Deals</h1>
                    <Grid.Row columns={this.state.topDeals.length}>
                        {this.renderProducts(this.state.topDeals)}
                    </Grid.Row>
                    <h1>Recommended for You</h1>
                    <Grid.Row columns={this.state.recommended.length}>
                        {this.renderProducts(this.state.recommended)}
                    </Grid.Row>
                    <h1>Best Seller</h1>
                    <Grid.Row columns={this.state.bestSeller.length}>
                        {this.renderProducts(this.state.bestSeller)}
                    </Grid.Row>
                </Grid>
            );
        } else {
            return <div>Loading Products...</div>
        }
    }

    renderProducts(products) {
        if (this.state.products) {
            return products.map((object) => {
                return (
                    <Grid.Column key={object["product_id"]}>
                        <ProductCard
                            handleSuccess={this.props.handleSuccess}
                            key={object["product_id"] + object["product_name"]}
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

    async componentDidMount() {
        const filter = this.state.filter;

        const response = await fetch(`http://localhost:8000/api/user/product/offered`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });
        const products = await response.json();

        const responseTopDeals = await fetch(`http://localhost:8000/api/user/product/topDeals`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });
        const topDealsArray = await responseTopDeals.json();

        //TODO: Make create the following arrays from api calls.
        const topDeals = topDealsArray.slice(0, 3);
        const recommended = products.slice(3, 7);
        const bestSeller = products.slice(7, 12);
<<<<<<< HEAD
        this.setState({ products, topDeals, recomended, bestSeller });
=======
        this.setState({ products, topDeals, recommended, bestSeller });
        // console.log(products);
>>>>>>> origin/buy-product
    }
}

export default ProductRow;