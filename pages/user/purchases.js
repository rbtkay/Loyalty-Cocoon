import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';

class Purchases extends Component {

    static async getInitialProps(props) {
        const { username } = props.query;

        return { username };
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <br />
                <h1>Here Are your Purchases {this.props.username}</h1>
            </div>
        );
    }
}

export default Purchases;