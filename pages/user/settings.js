import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import { Segment } from 'semantic-ui-react';

class Settings extends Component {

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
                <br />
                <br />
                <Segment textAlign='center'>
                    <h1>Page Under Construction...</h1>
                </Segment>
            </div>
        )
    }
}

export default Settings;