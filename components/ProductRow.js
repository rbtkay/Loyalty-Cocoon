import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card, CardGroup, Grid, GridColumn, Segment, Container } from 'semantic-ui-react';
import { Router } from '../routes';
let cookie = require('../cookie');

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

                <Grid.Row>
                    <Grid.Row>
                        <h1>Top Deals</h1>
                    </Grid.Row>

                    <Segment inverted color='violet'>
                        <Grid columns={this.state.topDeals.length}>
                            {this.renderProducts(this.state.topDeals)}
                        </Grid>
                    </Segment>

                    <Grid.Row>
                        <Segment textAlign='center'>
                            <h1>Recommended for You</h1>
                        </Segment>
                    </Grid.Row>

                    <Segment inverted color='violet'>
                        <Grid columns={this.state.recommended.length}>
                            {this.renderRecommendation(this.state.recommended)}
                        </Grid>
                    </Segment>

                    <Grid.Row>
                        <h1>Best Seller</h1>
                    </Grid.Row>

                    <Segment inverted color='violet'>
                        <Grid columns={this.state.bestSeller.length}>
                            {this.renderProducts(this.state.bestSeller)}
                        </Grid>
                    </Segment>

                </Grid.Row>

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
                            key={object["product_id"]}
                            id={object["product_id"]}
                            name={object["product_name"]}
                            description={object["product_description"]}
                            vendor={object["user_username"]}
                            priceLoco={object["product_loco"] + " Loco"}
                            category={object["product_category"]}
                        />
                    </Grid.Column>
                );
            })
        }
    }

    // renderRecommendation(recommendation) {
    //     // <Card.Group>/
    //     return recommendation.map((object) => {
    //         return (
    //             <ProductCard
    //                 handleSuccess={this.props.handleSuccess}
    //                 key={object["product_id"]}
    //                 id={object["product_id"]}
    //                 name={object["product_name"]}
    //                 description={object["product_description"]}
    //                 vendor={object["user_username"]}
    //                 priceLoco={object["product_loco"] + " Loco"}
    //                 category={object["product_category"]}
    //             />
    //         );
    //     })
    //     // </Card.Group>
    // }


    async componentDidMount() {
        const filter = this.state.filter;

        // try {
        const response = await fetch(`/api/user/product/offered`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });

        const responseTopDeals = await fetch(`/api/user/product/topDeals`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });

        const responseRecommended = await fetch(`http://localhost:8000/api/user/product/recommended?username=kvnbog`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });

        // if (responseRecommended.status === 200) {
        // console.log(recommendedJSON);
        // }

        if (response.status === 401 || responseTopDeals.status === 401) {
            cookie.deleteCookie();
            window.location = '/';
        } else if (response.status === 200) {
            const products = await response.json();
            const topDealsArray = await responseTopDeals.json();
            const recommendedJSON = await responseRecommended.json();

            const topDeals = topDealsArray.slice(0, 3);
            //TODO: Make create the following arrays from api calls.
            const recommended = products.slice(3, 7);
            const bestSeller = products.slice(7, 12);
            this.setState({ products, topDeals, recommended, bestSeller });
        }



    }
}

export default ProductRow;