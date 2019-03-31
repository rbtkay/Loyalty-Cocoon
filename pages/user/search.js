import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card, Segment, Container, Button } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';
import { Router } from '../../routes';

class search extends Component {

    state = {
        products: [],
        search: ''
    }

    static async getInitialProps(props) {
        const { search } = props.query;

        console.log(props);

        console.log("the search:" + search);

        try {
            const response = await fetch(`http://localhost:8000/api/user/product/search?search=${search}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });

            const products = await response.json();

            if (response.status === 401) {
                return ({ redirect: '/' });
            }

            return ({ search, products });

        } catch (e) {
            return ({ redirect: '/user' });
        }
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <Container>
                    <Card.Group>{this.renderProducts()}</Card.Group>
                </Container>
            </div>
        )
    }

<<<<<<< HEAD
    checkAuth = () => {
        if (this.props.redirect) {
            Router.pushRoute(this.props.redirect);
        }
    }

    componentDidMount() {
        this.checkAuth();
=======
    async componentdidmount(req) {
        const { search } = req.query;

        const response = await fetch(`http://localhost:8000/api/user/product/search?search=${search}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        const products = await response.json();
        this.setState({ search, products });
>>>>>>> origin/buy-product
    }

    renderProducts() {
        if (this.props.products) {
            if (this.props.products.length > 0) {
                return this.props.products.map((object) => {
                    return (
                        <ProductCard
                            key={object["product_id"]}
                            name={object["product_name"]}
                            description={object["product_description"]}
                            vendor={object["vendor_username"]}
                            priceLoco={object["product_loco"] + " Loco"}
                            category={object["product_category"]}
                        />
                    );
                })
            } else {
                return (
                    <Container>
                        <Segment>
                            <h3>No Product Found.</h3>
                        </Segment>
                    </Container>
                )
            }
        } else {
            <Container>
                <Segment>
                    <h3>Loading Products...</h3>
                </Segment>
            </Container>
        }
    }
}

export default search;