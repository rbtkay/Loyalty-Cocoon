import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import Purchase from '../../components/Purchase'
import { Container, Segment, Search, Grid, Statistic, Popup, Input, Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import loco from '../../ethereum/loco';
import { createCipher } from 'crypto';
let cookie = require('../../cookie');

class Transaction extends Component {

    state = {
        purchases: [],
        purchaseLength: '',
        searchValue: '',
        searchResult: [],
        isSearchLoading: false,
        searchValue: '',
        username: '',
        amount: '',
        loading: false,
        isOpen: false,
        countProduct: '',
        countPurchase: ''
    }

    render() {
        const { purchases, isSearchLoading, searchResult, searchValue } = this.state;
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <br />

                <Segment>
                    <Grid>
                        <Grid.Column width={4}>
                            <h1>Your Transactions</h1>
                        </Grid.Column>
                        <Grid.Column width={2} />
                        <Grid.Column width={3}>
                            <Popup
                                trigger={<Button
                                    color='violet'
                                    icon='gift'
                                    content='Reward Customer' />}
                                header='Give Customer LOCO'
                                open={this.state.isOpen}
                                onOpen={this.handleOpen}
                                onClose={this.handleClose}
                                content={
                                    <Form>
                                        <br />
                                        <Form.Field>
                                            <Input
                                                fluid
                                                name="username"
                                                value={this.state.username}
                                                onChange={event => this.setState({ username: event.target.value })}
                                                placeholder="Username"
                                            />
                                        </Form.Field>

                                        <Form.Field>
                                            <Input
                                                fluid
                                                name="amount"
                                                value={this.state.amount}
                                                onChange={event => this.setState({ amount: event.target.value })}
                                                placeholder="Amount"
                                                label="LOCO"
                                                labelPosition='right'
                                            />
                                        </Form.Field>
                                        <Button
                                            loading={this.state.loading}
                                            fluid
                                            style={{ textAlign: 'center' }}
                                            circular
                                            color='violet'
                                            onClick={this.grantPoints}>Send
                                        </Button>
                                    </Form>
                                }
                                on='focus'
                                position='bottom center' />
                        </Grid.Column>
                        <Grid.Column width={3} />
                        <Grid.Column width={4}>
                            <Search
                                input={{ fluid: true }}
                                loading={isSearchLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                results={searchResult}
                                value={searchValue}
                                placeholder={'Search for Customers...'}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>

                <Segment>
                    <Statistic.Group widths='2' color='violet' size='small'>
                        <Statistic>
                            <Statistic.Value>{this.state.countProduct}</Statistic.Value>
                            <Statistic.Label>Items Currently Offered</Statistic.Label>
                        </Statistic>

                        <Statistic>
                            <Statistic.Value>{this.state.countPurchase}</Statistic.Value>
                            <Statistic.Label>Items Sold This Month</Statistic.Label>
                        </Statistic>
                    </Statistic.Group>
                </Segment>

                <Segment inverted color='violet'>
                    {this.renderPurchases()}
                </Segment>
            </div>
        )
    }

    resetComponent = () => this.setState(({ isSearchLoading: false, searchResults: [], searchValue: '' }), () => {
        this.refresh();
    })

    handleResultSelect = (e, { result }) => {
        this.setState(({ searchValue: result.name }), () => {
            this.refresh();
        });
    }

    refresh() {
        this.componentDidMount();
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, searchValue: value })

        setTimeout(() => {
            if (this.state.searchValue.length < 1) return this.resetComponent()

            const { purchases, purchaseLength } = this.state;

            const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i');
            const isMatch = searchResult => re.test(searchResult.name);

            let source = [];
            purchases.map(object => {
                const temp = source.findIndex(item => item.name === object['user_username']);

                if (temp === -1) {
                    source.push({
                        key: object['purchase_id'],
                        title: object['user_username'],
                        name: object['user_username'],
                    });
                }

            })

            this.setState({
                isSearchLoading: false,
                searchResult: _.filter(source, isMatch),
            })
        }, 300)
    }

    async componentDidMount() {
        const username = cookie.getCookie('username');
        const { searchValue } = this.state;
        let response;

        if (searchValue.length > 0) {
            response = await fetch(`/api/vendor/purchase/byVendorUser?vendorUsername=${username}&userUsername=${searchValue}`, {
                headers: new Headers({
                    'authorization': cookie.getCookie('authorization')
                })
            });
        } else {
            response = await fetch(`/api/vendor/purchase/byVendor?username=${username}`, {
                headers: new Headers({
                    'authorization': cookie.getCookie('authorization')
                })
            });
        }

        if (response.status === 401) {
            Router.pushRoute('/');
        } else if (response.status === 404) {
            this.setState({ purchaseLength: 0 });
        } else {
            const purchases = await response.json();
            this.setState({
                purchases: purchases,
                purchaseLength: purchases.length
            })
        }
        this.setStatValues(username);
    }

    async setStatValues(username) {

        try {
            const responseProduct = await fetch(`/api/stats/countProductOfferedVender?username=${username}`);
            const resultProduct = await responseProduct.json();

            const responsePurchase = await fetch(`/api/stats/countPurchaseVendorPerMonth?username=${username}`);
            const resultPurchase = await responsePurchase.json();

            const countProduct = resultProduct[0]['productsCount'].toString();
            const countPurchase = resultPurchase.toString();

            this.setState({ countProduct: countProduct, countPurchase: countPurchase });
        } catch (err) {
            throw err;
        }
    }

    renderPurchases() {
        if (this.state.purchaseLength === '') {
            return (
                <h3>Loading Your Purchases</h3>
            )
        } else if (this.state.purchaseLength === 0) {
            return (
                <h3>No transactions at this point...</h3>
            )
        } else {
            const purchases = this.state.purchases;
            return (
                purchases.map(object => {
                    return (
                        <Segment color='violet' key={object['purchase_id']}>
                            <Purchase
                                key={object['purchase_id']}
                                purchaseId={object['purchase_id']}
                                productName={object['product_name']}
                                username={object['user_username']}
                                vendor={object['vendor_id']}
                                time={object['purchase_date']}
                                isFinalized={object['purchase_finalized']}
                                finalize={this.finalizePurchase}
                                type={'vendor'}
                            />
                        </Segment>
                    )
                })
            )
        }
    }

    finalizePurchase = () => {
        this.componentDidMount();
    }

    handleOpen = () => {
        this.setState({ isOpen: true });
    }

    handleClose = () => {
        this.setState({ isOpen: false });
    }

    grantPoints = async (event) => {
        event.preventDefault();

        if (!this.state.loading) {
            this.setState({ loading: true });
            try {
                const { username, amount } = this.state;
                const response = await fetch(`/api/vendor/address?username=${this.state.username}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });

                const receiver = await response.json();
                const manager = await loco.methods.manager().call();

                const res = await fetch(`/api/contract/grant?address=${receiver[0].user_ethAddress}&amount=${amount}`);

                const result = await res.json();

                this.setState({ username: '', amount: '' });
            } catch (err) {
                throw err;
            }
            this.setState({ loading: false, isOpen: false });
        }
    }
}

export default Transaction;