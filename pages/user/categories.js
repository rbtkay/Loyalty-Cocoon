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

        return { category };
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
                <Segment>
                    <h1>{this.props.category}</h1>
                </Segment>
                <SemanticToastContainer />
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

    async componentDidMount() {
        const { category } = this.props;
        try {
            const response = await fetch(`/api/user/product/category?category=${category}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });

            if (response.status === 401) {
                Router.pushRoute('/');
            } else if (response.status === 200) {
                const products = await response.json();
                this.setState({ products, category })
            } else if (response.status === 404) {
                this.setState({ products: [], category });
            }

        } catch (e) {
            throw e;
        }
    }

    renderProducts = () => {
        console.log("category page");
        console.log(this.state.products);
        if (this.state.products) {
            if (this.state.products.length > 0) {
                return (<CategoryCard {...this.state} handleSuccess={this.flipSuccess} />);
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