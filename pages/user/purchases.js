import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import Purchase from '../../components/Purchase';
import { Segment } from 'semantic-ui-react';

class Purchases extends Component {

    state = {
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
                <h1>Here Are your Purchases {this.props.username}</h1>
                <Segment>
                    {this.renderPurchases()}
                </Segment>
            </div>
        );
    }

    async componentDidMount() {
        const username = localStorage.getItem('username');

        try {
            const response = await fetch(`http://localhost:8000/api/user/purchase/byUser?username=${username}`, {
                headers: new Headers({
                    authorization: localStorage.getItem('authorization')
                })
            })

            const purchases = await response.json();
            console.log(purchases);
            this.setState({
                purchases,
                purchaseLength: purchases.length
            })
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
                        <Purchase
                            key={object['purchase_id']}
                            purchaseId={object['purchase_id']}
                            productName={object['product_name']}
                            username={object['user_email']}
                            vendor={object['vendor_username']}
                            time={object['purchase_time']}
                            type={'regular'}
                        />
                    )
                })
            )
        }
    }


}

export default Purchases;