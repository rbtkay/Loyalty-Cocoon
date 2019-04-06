import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import Purchase from '../../components/Purchase'
import { Container, Segment, Search, Grid, Statistic, Popup, Input, Button, Form } from 'semantic-ui-react';
import _ from 'lodash';
import loco from '../../ethereum/loco';


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
        isOpen: false
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
                                    content='Grant Points' />}
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
                            <Statistic.Value>100</Statistic.Value>
                            <Statistic.Label>Items Currently Offered</Statistic.Label>
                        </Statistic>

                        <Statistic>
                            <Statistic.Value>200</Statistic.Value>
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

            const source = purchases.map(object => {
                return {
                    key: object['purchase_id'],
                    title: object['user_username'],
                    name: object['user_username'],
                    description: object['user_username']
                }
            })

            this.setState({
                isSearchLoading: false,
                searchResult: _.filter(source, isMatch),
            })
        }, 300)
    }

    async componentDidMount() {
        const username = localStorage.getItem('username');
        const { searchValue } = this.state;
        let response;

        if (searchValue.length > 0) {
            response = await fetch(`http://localhost:8000/api/vendor/purchase/byVendorUser?vendorUsername=${username}&userUsername=${searchValue}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });
        } else {
            response = await fetch(`http://localhost:8000/api/vendor/purchase/byVendor?username=${username}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
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
                        <Segment color='violet'>
                            <Purchase
                                key={object['purchase_id']}
                                purchaseId={object['purchase_id']}
                                productName={object['product_name']}
                                username={object['user_username']}
                                vendor={object['vendor_username']}
                                time={object['purchase_time']}
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
                const response = await fetch(`http://localhost:8000/api/vendor/address?username=${this.state.username}`, {
                    headers: new Headers({
                        'authorization': localStorage.getItem('authorization')
                    })
                });

                const receiver = await response.json();
                const manager = await loco.methods.manager().call();

                const res = await fetch(`http://localhost:8000/api/contract/grant?address=${receiver[0].user_address}&amount=${amount}`);

                const result = await res.json();
                console.log(result);

                this.setState({ username: '', amount: '' });
            } catch (err) {
                throw err;
            }
            this.setState({ loading: false, isOpen: false });
        }
    }
}

export default Transaction