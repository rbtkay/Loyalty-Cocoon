import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import { Segment } from 'semantic-ui-react';

class Settings extends Component {

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br /> <br /> <br /> <br />
                <Segment textAlign='center'>
                    <h1>Page Under Construction...</h1>
                </Segment>
            </div>
        )
    }
}

export default Settings;