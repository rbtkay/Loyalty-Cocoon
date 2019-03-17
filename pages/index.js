import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import ProductRow from '../components/ProductRow';
import NavigationBar from '../components/NavigationBar';
import loco from '../ethereum/loco';
import web3 from '../ethereum/web3';

class Loyalty extends Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            filter: "all",
            account: '',
            balance: 0,
            loading: false
        };
    }

    async componentDidMount() {
        const account = localStorage.getItem('address');
        const balance = await loco.methods.balances(account).call();
        this.setState({ account, balance });
    }

    propsNavigation = (filter) => {
        // this.setState(filter);
        // console.log(this.state.filter);
        this.setState({ filter });
        // console.log(this.state.filter);
    }

    // static getInitialProps({req}){
    //     // console.log(req['headers']);

    //     return {};
    // }

    onClick = async event => {
        const newAccount = web3.eth.accounts.create();
        // const myAccount = await web3.eth.personal.newAccount('mypass');
        console.log('new account: ' + newAccount["address"]);
        // console.log('my account: ' + myAccount);
        const allAccounts = await web3.eth.getAccounts();
        console.log('all accounts: ' + allAccounts);
        // this.setState({ loading: true });
        // try {
        //     await loco.methods.grantPoints(this.state.account, 5000).send({ from: this.state.account });
        // } catch (err) {
        //     throw err;
        // }
        // const balance = await loco.methods.balances(accounts[0]).call();
        // this.setState({ loading: false, balance });
    }

    render() {
        return (
            <div>
                <Layout />
                Main Account Address: {this.state.account}
                <br />
                Main Account Balance: {this.state.balance}
                <Button loading={this.state.loading} onClick={this.onClick} color="violet">Send Me Points!</Button>
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
