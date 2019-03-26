import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';

class search extends Component {

    static async getInitialProps(props) {
        const { search } = props.query;

        console.log("the search:" + search);
        
        const response = await fetch(`http://localhost:8000/api/user/product/search?search=${search}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        const products = await response.json();

        console.log(products);

        return { search, products };
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
                <Card.Group>{this.renderProducts()}</Card.Group>
            </div>
        )
    }

    renderProducts(){
        if (this.props.products.length) {
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
        }
    }
}

export default search;