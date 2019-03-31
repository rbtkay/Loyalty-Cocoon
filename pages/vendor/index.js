import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import Purchase from '../../components/Purchase'
import { Container, Segment, Search, Grid, Statistic } from 'semantic-ui-react';
import _ from 'lodash';

class Transaction extends Component {

    state = {
        purchases: [],
        purchaseLength: '',
        searchValue: '',
        searchResult: '',
        isSearchLoading: false,
        searchValue: ''
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
                        <Grid.Column width={12}>
                            <h1>Your Transactions</h1>
                        </Grid.Column>
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


                <Statistic.Group color='violet' size='small'>
                    <Statistic>
                        <Statistic.Value>100</Statistic.Value>
                        <Statistic.Label>Items Currently Offered</Statistic.Label>
                    </Statistic>

                    <Statistic>
                        <Statistic.Value>200</Statistic.Value>
                        <Statistic.Label>Items Sold This Month</Statistic.Label>
                    </Statistic>
                </Statistic.Group>

                <Container>
                    <Segment>

                        {this.renderPurchases()}
                    </Segment>
                </Container>
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
                        <Purchase
                            key={object['purchase_id']}
                            purchaseId={object['purchase_id']}
                            productName={object['product_name']}
                            username={object['user_email']}
                            vendor={object['vendor_username']}
                            time={object['purchase_time']}
                            finalize={this.finalizePurchase}
                            type={'vendor'}
                        />
                    )
                })
            )
        }
    }

    finalizePurchase = () => {
        this.componentDidMount();
    }
}

export default Transaction