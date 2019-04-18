import React, { Component } from 'react';
import NavigationBar from '../../components/VendorNavBar';
import Layout from '../../components/Layout';
import CompSettings from '../../components/CompSettings';
import { Segment } from 'semantic-ui-react';
import { getCookie } from '../../cookie';

class Settings extends Component {
    state = {
        user: {}
    };

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br /> <br /> <br /> <br />
                <Segment>
                    <CompSettings user={this.state.user} onSubmit={this.submit}/>
                </Segment>
            </div>
        )
    }

    async componentDidMount() {
        const username = getCookie('username');
        const response = await fetch(`/api/vendor/byUsername?username=${username}`, {
            headers: new Headers({
                'authorization': getCookie('authorization')
            })
        })

        const user = await response.json();
        this.setState({ user: user[0] });
    }

    submit = () => {
        console.log('vendor clicked');
    }
}

export default Settings;