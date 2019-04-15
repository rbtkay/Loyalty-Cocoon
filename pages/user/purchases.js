import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import Purchase from '../../components/Purchase';
import { Segment } from 'semantic-ui-react';
import Router from '../../routes';
let cookie = require('../../cookie');

class Purchases extends Component {

    state = {
        username: '',
        purchases: [],
        purchaseLength: ''
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />
                <h1 className='violet'>Your Purchases</h1>
                <Segment>
                    {this.renderPurchases()}
                </Segment>
            </div>
        );
    }

    async componentDidMount() {
        const username = cookie.getCookie('username');

        try {
            const response = await fetch(`/api/user/purchase/byUser?username=${username}`, {
                headers: new Headers({
                    authorization: cookie.getCookie('authorization')
                })
            })
            if (response.status === 401) {
                Router.pushRoute('/');
            } else {

                const purchases = await response.json();
                this.setState({
                    username,
                    purchases,
                    purchaseLength: purchases.length
                })
            }
        } catch (e) {
            throw e;
        }
    }

    renderPurchases() {
        if (this.state.purchaseLength === '') {
            return (
                <h3>Loading Your Purchases</h3>
            )
        } else if (this.state.purchaseLength === 0) {
            return (
                <h3>Purchases Not Found</h3>
            )
        } else {
            const purchases = this.state.purchases;
            return (
                purchases.map(object => {
                    return (
                        <Segment color='violet'>
                            <Purchase
                                key={object['purchase_id']}
                                purchaseId={object['purchase_id']}
                                productName={object['product_name']}
                                username={object['user_email']}
                                vendor={object['vendor_username']}
                                time={object['purchase_date']}
                                isFinalized={object['purchase_finalized']}
                                type={'regular'}
                            />
                        </Segment>
                    )
                })
            )
        }
    }


}

export default Purchases;