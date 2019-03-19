import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import Layout from '../components/Layout';

class Index extends Component {

    render() {

        return (
            <div>
                <Layout />
                <NavigationBar />
            </div>
        );
    }

}

export default Index;