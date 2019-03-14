import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import NavigationBar from '../components/NavigationBar';
import { Router } from '../routes';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: []
        };
    }

    // static getInitialProps({req}){
    //     // console.log(req['headers']);

    //     return {};
    // }

    render() {
        return (
            <div>

                <Layout />
                <NavigationBar />
                {this.renderProducts()}

            </div>
        );
    }

    async componentDidMount() {
        // console.log(req);
        console.log("on react" + localStorage.getItem('authorization'));
        const auth = localStorage.getItem('authorization');
        
        if (auth === null) {
            Router.pushRoute("/signin");
        } else {

            const response = await fetch(`http://localhost:8000/api/product/all`, {
                headers: new Headers({
                    'authorization': auth
                })
            });
            const products = await response.json();

            console.log("working" + products);
            this.setState({ products });
        }
    }

    search = async () => {
        const response = await fetch(`http://localhost:8000/api/product/search`);
        const products = await response.json();
        this.setState({ products });
    }

    renderProducts() {
        if (this.state.products.length > 0) {
            return <ProductRow products={this.state.products} />
        }
    }
}

export default Loyalty;