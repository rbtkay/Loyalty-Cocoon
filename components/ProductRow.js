import React, { Component } from 'react';
import ProductCard from './ProductCard';
import { Card, CardGroup } from 'semantic-ui-react';
import { Router } from '../routes';

class ProductRow extends Component {
    // constructor/() {
    // const { filter } = this.props;
    // }

    // constructor() {

        state = {
            products: [],
            filter: "all"
        }

        // this.setState()
    // }

    // static async getInitialProps(){
    //     console.log("hello");
    // }

    render() {
        // return "hello"
        // const { filter } = this.props;

        // if (this.state.products.length > 0) {
        // this.test();
        console.log(this.props.filter);
        if (this.state.products.length > 0) {
            return (
                // if (this.state.product.length > 0) {
                <CardGroup>
                    {this.renderProducts(this.state.products)}
                </CardGroup>
            );
        }
        // }
        else {
            return <div>Loading Products...</div>
        }
    }

    renderProducts(products) {
        if (this.state.products) {
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

    async componentDidMount() {
        const filter = this.state.filter;
        console.log("filter in component did mount" + filter);

        // if (auth === null) {
        //     Router.pushRoute("/signin");
        // } else {

        const response = await fetch(`http://localhost:8000/api/product/${filter}`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
            })
        });
        const products = await response.json();

        // component rerendered each time because setState is called everytime.
        // console.log("working" + products);
        this.setState({ products });
        // console.log(this.state.products);
    }

    async componentWillReceiveProps() {
        // console.log(req);
        // console.log("on react" + localStorage.getItem('authorization'));
        // const auth = localStorage.getItem('authorization');

        // const { filter } = this.props;
        const { filter } = this.props;
        console.log("filter in componentWillReceiveProps" + filter);

        // if (auth === null) {
        //     Router.pushRoute("/signin");
        // } else {

        const response = await fetch(`http://localhost:8000/api/product/${filter}`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
            })
        });
        const products = await response.json();

        // component rerendered each time because setState is called everytime.
        console.log("working" + products);
        this.setState({ products });
        console.log(this.state.products);
        // }
    }
}

export default ProductRow;
