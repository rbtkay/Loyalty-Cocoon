import React, { Component } from 'react';

class Settings extends Component {

    static async getInitialProps(props) {
        const { username } = props.query;

        return { username };
    }

    render() {
        return (
            <h1>Your Settings {this.props.username}</h1>
        )
    }
}

export default Settings;