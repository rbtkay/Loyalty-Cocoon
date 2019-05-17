import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card, CardGroup, Grid, GridColumn, Segment, Container, Divider } from 'semantic-ui-react';
import { Router } from '../routes';
let cookie = require('../cookie');

class ProductRow extends Component {
    state = {
        products: [],
        topDeals: [],
        bestSeller: [],
        recommended: [],
        filter: "all"
    }

    render() {
        if (this.state.products.length > 0) {
            return (

                <Grid.Row>
                    <Segment textAlign='center'>
                        <h1>Top  Deals</h1>
                    </Segment>
                    <Segment inverted color='violet'>
                        <Grid columns={this.state.topDeals.length}>
                            {this.renderProducts(this.state.topDeals)}
                        </Grid>
                    </Segment>

                    <Grid.Row>
                        <Segment textAlign='center'>
                            <h1>Best Seller</h1>
                        </Segment>
                    </Grid.Row>

                    <Segment inverted color='violet'>
                        <Grid columns={this.state.bestSeller.length}>
                            {this.renderProducts(this.state.bestSeller)}
                        </Grid>
                    </Segment>

                    <Grid.Row>
                        <Segment textAlign='center'>
                            <h1>Recommended for You</h1>
                        </Segment>
                    </Grid.Row>

                    <Segment color='violet'>
                        {/* <Grid> */}
                        {/* <Grid.Column width='2'>
                                <h2>Because you bought:</h2>
                                <h5>Gin</h5>
                            </Grid.Column>
                            <Grid.Column width='14'>
                                <Grid columns={this.state.recommended.length}>
                                    {this.renderRecommendation()}
                                </Grid>
                            </Grid.Column> */}
                        {this.renderRecommendation()}
                        {/* </Grid> */}
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
                            img={object['product_image']}
                        />
                    </Grid.Column>
                );
            })
        }
    }

    renderRecommendation() {
        if (this.state.recommended.length > 0) {
            console.log('shu l wade3?', this.state.recommended);
            return (this.state.recommended.map((object) => {
                console.log('testing obejct', object);
                if (Object.values(object).toString() != Array(0)) {
                    return (
                        <Segment color='violet' inverted key={Object.keys(object)}>
                            <Grid columns={2}>
                                <Grid.Column width='2'>
                                    <h3>Because you bought: <i>{Object.keys(object)}</i></h3>
                                </Grid.Column>
                                <Grid.Column width='14'>
                                    <Grid columns={5}>
                                        {this.renderSection(object)}
                                    </Grid>
                                </Grid.Column>
                            </Grid>
                        </Segment>)
                }
            }))
        }
    }

    renderSection(object) {
        return (Object.keys(object).map((item) => {
            return object[item].map((value) => {
                if (value.product_isOffered.data[0] == 1) {
                    return (
                        <Grid.Column key={(value["product_id"])}>
                            <ProductCard
                                handleSuccess={this.props.handleSuccess}
                                key={(value["product_id"])}
                                id={value["product_id"]}
                                name={value["product_name"]}
                                description={value["product_description"]}
                                vendor={value["user_username"]}
                                priceLoco={value["product_loco"] + " Loco"}
                                category={value["product_category"]}
                                img={value['product_image']}
                            />
                        </Grid.Column>
                    )
                }
            })
        }))
    }

    async componentDidMount() {
        const filter = this.state.filter;
        const username = cookie.getCookie('username');

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

        const responseRecommended = await fetch(`/api/user/product/recommended?username=${username}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });

        if (response.status === 401 || responseTopDeals.status === 401 || responseRecommended.status === 401) {
            cookie.deleteCookie();
            window.location = '/';
        } else if (response.status === 200) {
            const products = await response.json();
            const topDealsArray = await responseTopDeals.json();
            const recommendedJSON = await responseRecommended.json();

            const topDeals = topDealsArray.slice(0, 3);
            const bestSeller = products.slice(7, 12);

            //TODO: Make create the following arrays from api calls.
            const recommended = recommendedJSON;

            console.log('recommendedJSON', recommendedJSON);

            let displayRec = [];
            let count = 0;



            Object.keys(recommended).map(async element => {
                console.log('recommended[element]', recommended);
                const rec = recommended[element].join(',');
                const productInfoRes = await fetch(`/api/user/product/info?id=${rec}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });
                const productInfo = await productInfoRes.json();

                let recList = {};
                recList[element] = productInfo;

                console.log('productInfo', productInfo);

                displayRec.push(recList);
                count++;
                if (count === Object.keys(recommended).length) {
                    this.callback(products, topDeals, displayRec, bestSeller);
                }
            })
        }
    }

    callback(products, topDeals, recommended, bestSeller) {
        this.setState({ products, topDeals, recommended, bestSeller })
    }
}

export default ProductRow;