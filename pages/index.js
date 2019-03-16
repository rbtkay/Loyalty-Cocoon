import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import NavigationBar from '../components/NavigationBar';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filter: "all"
        };
    }

    propsNavigation = (filter) => {
        // this.setState(filter);
        console.log(this.state.filter);
        this.setState({ filter });
        console.log(this.state.filter);
    }

    // static getInitialProps({req}){
    //     // console.log(req['headers']);

    //     return {};
    // }

    render() {
      {console.log(this.state.products)}
        return (
            <div>

                <Layout />
                <NavigationBar propsNavigation={this.propsNavigation} />
                {/* {this.renderProducts()} */}
                <ProductRow filter={this.state.filter} />

            </div>
        );
    }

    // async componentDidMount() {
    //     // console.log(req);
    //     console.log("on react" + localStorage.getItem('authorization'));
    //     const auth = localStorage.getItem('authorization');

    //     if (auth === null) {
    //         Router.pushRoute("/signin");
    //     } else {

    //         const response = await fetch(`http://localhost:8000/api/product/all`, {
    //             headers: new Headers({
    //                 'authorization': auth
    //             })
    //         });
    //         const products = await response.json();

    //         console.log("working" + products);
    //         this.setState({ products });
    //     }
    // }

    // search = async () => {
    //     const response = await fetch(`http://localhost:8000/api/product/search`);
    //     const products = await response.json();
    //     this.setState({ products });
    // }

    renderProducts() {
        // if (this.state.products.length > 0) {
        return <ProductRow filter={this.state.filter} />
        // }
    }
}

export default Loyalty;
