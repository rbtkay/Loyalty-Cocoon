import React, { Component } from 'react';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import { Segment, Card } from 'semantic-ui-react';
import CategoryCard from '../../components/CategoryCard';
import { Router } from '../../routes';
import { SemanticToastContainer, toast } from "react-semantic-toasts";

class Categories extends Component {

    static async getInitialProps(props) {
        const { category } = props.query;

        try {
            const response = await fetch(`http://localhost:8000/api/user/product/category?category=${category}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });

            if (response.status === 401) {
                return { redirect: '/' };
            } else {
                const products = await response.json();
                return { products, category };
            }

        } catch (e) {
            return { redirect: '/user' };
        }
    }


    state = {
        successful: false
    };

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <br />
                <SemanticToastContainer />
                <h1>{this.props.category}</h1>
                <Segment inverted color='violet'>

                    {this.renderProducts()}

                </Segment>
            </div>
        )
    }

    checkAuth = () => {
        if (this.props.redirect) {
            Router.pushRoute(this.props.redirect);
        }
    }

    componentDidMount() {
        this.checkAuth();
    }

    renderProducts = () => {
        console.log("category page");
        console.log(this.props.products);
        if (this.props.products) {
            if (this.props.products.length > 0) {
                return (<CategoryCard {...this.props} handleSuccess={this.flipSuccess} />);
            } else {
                return (<h4>No Product are Available for this Category.</h4>);
            }
        } else {
            return (<h4>Loading Products...</h4>)
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

export default Categories;