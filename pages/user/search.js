import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Card } from 'semantic-ui-react';
import ProductCard from '../../components/ProductCard';

class search extends Component {

    static async getInitialProps(props) {
        const { search } = props.query;

        console.log("the search:" + search);

        //FIXME: calling the wrong api. must call the search api.
        const response = await fetch(`http://localhost:8000/api/product/search?search=${search}`, {
            headers: new Headers({
                'authorization': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJyYnRrYXkiLCJ1c2VyX2VtYWlsIjoicm9iZXJ0QGdtYWlsLmNvbSIsInVzZXJfcGFzc3dvcmQiOiJoYWhhaGEiLCJ1c2VyX25hbWUiOiJyb2JlcnQiLCJ1c2VyX2RvYiI6IjIwMTktMDMtMDFUMjI6MDA6MDAuMDAwWiIsInVzZXJfZ2VuZGVyIjoiTSIsInVzZXJfcGhvbmUiOiI3MDY1NzMwMCIsInVzZXJfcHJlZnMiOiJuZXNjYWZlIiwidXNlcl9hZGRyZXNzIjoiMHhhZXJic2VyYnNiIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IkRvY3RvciIsInVzZXJfb3JnYW5pemF0aW9uIjoiSG90ZWwgRGlldSJ9XSwiaWF0IjoxNTUyNjQxNDA3fQ.Ao-ZJ9yifCnnjInOWC6gRwleSYCHmJ9Ob1L6-jQsKF0"
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