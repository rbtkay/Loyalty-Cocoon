import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card, CardGroup, Grid, GridColumn } from 'semantic-ui-react';
import { Router } from '../routes';

class ProductRow extends Component {
    state = {
        products: [],
        topDeals: [],
        recomended: [],
        bestSeller: [],
        filter: "all"
    }

    render() {
        // console.log(this.props.filter);
        if (this.state.products.length > 0) {
            return (
                <Grid>
                    <h1>Top Deals</h1>
                    <Grid.Row columns={this.state.topDeals.length}>
                        {this.renderProducts(this.state.topDeals)}
                    </Grid.Row>
                    <h1>Recomended for You</h1>
                    <Grid.Row columns={this.state.recomended.length}>
                        {this.renderProducts(this.state.recomended)}
                    </Grid.Row>
                    <h1>Best Seller</h1>
                    <Grid.Row columns={this.state.bestSeller.length}>
                        {this.renderProducts(this.state.bestSeller)}
                    </Grid.Row>
                </Grid>
            );
        }
        else {
            return <div>Loading Products...</div>
        }
    }

    renderProducts(products) {
        if (this.state.products) {
            return products.map((object) => {
                return (
                    <Grid.Column key={object["product_id"]}>
                        <ProductCard
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
        console.log("filter in component did mount" + filter);

        const response = await fetch(`http://localhost:8000/api/product/all`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
            })
        });
        const products = await response.json();

        const responseTopDeals = await fetch(`http://localhost:8000/api/product/topDeals`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
            })
        });
        const topDealsArray = await responseTopDeals.json();

        //TODO: Make create the following arrays from api calls.
        const topDeals = topDealsArray.slice(0, 3);
        const recomended = products.slice(3, 7);
        const bestSeller = products.slice(7, 12);
        this.setState({ products, topDeals, recomended, bestSeller });
        // console.log(products);
    }

    async componentWillReceiveProps() {

        const filter = this.state.filter;
        console.log("filter in componentWillReceiveProps" + filter);


        const response = await fetch(`http://localhost:8000/api/product/${filter}`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
            })
        });
        const products = await response.json();

        // console.log("working" + products);
        this.setState({ products });
        // console.log(this.state.products);
    }
}

export default ProductRow;
