import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card, Segment, Container } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';

class search extends Component {

    state = {
        products: [],
        search: ''
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

    async componentdidmount(req) {
        const { search } = req.query;

        console.log("the search:" + search);

        const response = await fetch(`http://localhost:8000/api/user/product/search?search=${search}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        const products = await response.json();

        console.log(products);

        this.setState({ search, products });
    }

    renderProducts() {
        if (this.state.products.length > 0) {
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
                        <h3>No Product Found</h3>
                    </Segment>
                </Container>
            )
        }
    }
}

export default search;