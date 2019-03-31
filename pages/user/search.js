import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card, Segment, Container, Button } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';
import CategoryCard from '../../components/CategoryCard';
import { Router } from '../../routes';
import { SemanticToastContainer, toast } from "react-semantic-toasts";

class search extends Component {

    state = {
        products: [],
        search: '',
        successful: false
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
                <Segment>
                    <br /><br /><br />
                    <Segment>
                        <h1>Search Results for '{this.props.search}'</h1>
                    </Segment>
                    <SemanticToastContainer />
                    <Segment color='violet' inverted>
                        {this.renderProducts()}
                    </Segment>
                </Segment>
            </div>
        )
    }

    async componentdidmount(req) {
        const { search } = req.query;

        const response = await fetch(`http://localhost:8000/api/user/product/search?search=${search}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        const products = await response.json();
        this.setState({ search, products });
    }

    renderProducts() {
        if (this.props.products) {
            if (this.props.products.length > 0) {
                return (<CategoryCard {...this.props} handleSuccess={this.flipSuccess} />);
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

    showSuccessToast = () => {
        setTimeout(() => {
            toast({
                type: "success",
                icon: "thumbs up",
                title: "Transaction Successful",
                description: "Congratulations! Your transaction is successful, please visit the vendor to claim your reward.",
                time: 5000
            });
        }, 5000);
    }

    flipSuccess = () => {
        if (!this.state.successful) {
            this.setState({ successful: true });
            this.showSuccessToast();
        } else {
            this.setState({ successful: false });
        }
    }
}

export default search;