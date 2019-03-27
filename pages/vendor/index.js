import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import Purchase from '../../components/Purchase'
import { Container, Segment, Search, Grid } from 'semantic-ui-react';
import _ from 'lodash';

// const source = _.times(5, () => ({
//     name: "faker.company.companyName()",
//     description: "faker.company.catchPhrase()",
//     image: "faker.internet.avatar()",
//     price: 'faker.finance.amount(0, 100, 2)',
// }))

class Transaction extends Component {

    state = {
        purchases: [],
        purchaseLength: '',
        searchValue: '',
        searchResult: [],
        isSearchLoading: false,
        searchValue: ''
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
    //TODO: implement search by customer username.
    //TODO: implement finalize function.

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
                    <Grid columns={2}>
                        <Grid.Column >
                            <h1>These are Your Purchases</h1>
                        </Grid.Column>
                        <Grid.Column textAlign='right'>
                            <Search
                                loading={isSearchLoading}
                                onResultSelect={this.handleResultSelect}
                                onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
                                results={searchResult}
                                value={searchValue}
                            />
                        </Grid.Column>
                    </Grid>
                </Segment>
                <Container>
                    <Segment>
                        {this.renderPurchases()}
                    </Segment>
                </Container>
            </div>
        )
    }

    resetComponent = () => this.setState({ isSearchLoading: false, searchResults: [], searchValue: '' })

    handleResultSelect = (e, { result }) => {
        console.log('handling the select result');
        console.log(this.state.searchValue);

        this.setState({ searchValue: result.name });
        console.log(this.state.searchValue);
        //TODO: on result click the api should be called to filter the transaction by vendor and user.
    }

    handleSearchChange = (e, { value }) => {
        this.setState({ isSearchLoading: true, searchValue: value })

        setTimeout(() => {
            if (this.state.searchValue.length < 1) return this.resetComponent()

            const { purchases, purchaseLength } = this.state;

            const re = new RegExp(_.escapeRegExp(this.state.searchValue), 'i');
            const isMatch = searchResult => re.test(searchResult.name);

            const source = _.times(purchaseLength, () => ({
                name: purchases[0]['user_username'],
                description: purchases[0]['user_username'],
            }))

            this.setState({
                isSearchLoading: false,
                searchResult: _.filter(source, isMatch),
            })
            console.log('source');
            console.log(this.state.searchResult);
        }, 300)
    }
    async componentDidMount() {
        const username = localStorage.getItem('username');
        const { searchResult } = this.state;

        let response;

        if (searchResult.length > 0) {
            response = await fetch(`http://localhost:8000/api/vendor/purchase/byVendorUser?vendorUsername=${username}&userUsername=${searchResult}`, {
                headers: new Headers({
                    'authorization': localStorage.getItem('authorization')
                })
            });
        }
        else {
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
            this.setState(
                {
                    purchases: purchases,
                    purchaseLength: purchases.length
                }
            )
        }
        console.log(this.state.purchases);
        // console.log(this.state.purchaseLength);

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
                            key={object['purchase_id']}
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