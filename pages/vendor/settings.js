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
                <Segment color='violet' inverted>
                    <br />
                    <CompSettings user={this.state.user} onSubmit={this.submit} cancelChanges={this.cancel}/>
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

    cancel = (event) => {
        event.preventDefault();
        console.log('cancelled');
        event.target.blur();
        window.location = '/vendor';
    }
}

export default Settings;