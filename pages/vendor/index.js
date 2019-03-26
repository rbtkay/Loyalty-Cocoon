import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import Purchase from '../../components/Purchase'
import { Container } from 'semantic-ui-react';

class Transaction extends Component {

    state = {
        purchases: [],
        purchaseLength: ''
    }

    // static async getInitialProps(props) {
    //     const username = props.username
    // try {
    // const response = await fetch(`http://localhost:8000/api/product/offered`, {
    //     headers: new Headers({
    //         'authorization': localStorage.getItem('authorization')
    //     })
    // });

    // const products = await response.json();

    // if (response.status === 401) {
    //     console.log('redirecting...');
    //     Router.push('/');
    // }

    // console.log(products);

    // } catch (err) {

    // Router.pushRoute('/');
    // }

    // return { props };
    // }
    //TODO: search by customer username.
    //TODO: implement finalize function.

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <br />
                <Container>
                    {this.renderPurchases()}
                </Container>
            </div>
        )
    }

    async componentDidMount() {
        const username = localStorage.getItem('username');

        const response = await fetch(`http://localhost:8000/api/vendor/purchase/byVendor?username=${username}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        if (response.status === 401) {
            Router.pushRoute('/');
        } else if (response.status === 404) {
            this.setState({ purchaseLength: 0 });
        } else {
            const purchases = await response.json();
            this.setState(
                {
                    purchases: purchases,
                    purchaseLength: purchases.length
                }
            )
        }
        console.log(this.state.purchases);
        console.log(this.state.purchaseLength);

    }


    renderPurchases() {
        if (this.state.purchaseLength === '') {
            return (
                <h3>Loading Your Purchases</h3>
            )
        } else if (this.state.purchaseLength === 0) {
            return (
                <h3>No Purchase Were Found</h3>
            )
        } else {
            const purchases = this.state.purchases;
            return (
                purchases.map(object => {
                    return (
                        <Purchase
                            purchaseId={object['purchase_id']}
                            productName={object['product_name']}
                            username={object['user_email']}
                            vendor={object['vendor_username']}
                            time={object['purchase_time']}
                        />
                    )
                })
            )
        }
    }
}

export default Transaction 