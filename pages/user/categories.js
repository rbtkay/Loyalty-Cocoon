import React, { Component } from 'react';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import { Segment } from 'semantic-ui-react';
import CategoryCard from '../../components/CategoryCard';
import { Router } from '../../routes';

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
                <h3>{this.props.category}</h3>
                <Segment>
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
                return (<CategoryCard {...this.props} />);
            } else {
                return (<h4>No Product are Available for this Category.</h4>);
            }
        } else {
            return (<h4>Loading Products...</h4>)
        }
    }
}

export default Categories;