import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
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
                    <Segment>
                        <CompSettings user={this.state.user} onSubmit={this.submit} cancelChanges={this.cancel}/>
                        <br /> <br /> <br />
                    </Segment>
                </Segment>
            </div>
        )
    }

    async componentDidMount() {
        const username = getCookie('username');
        const response = await fetch(`/api/user/byUsername?username=${username}`, {
            headers: new Headers({
                'authorization': getCookie('authorization')
            })
        });

        const user = await response.json();
        this.setState({ user: user[0] });
    }

    // FIXME: check whether to keep submits on pages or move into components

    submit = () => {
        console.log('submit: ', this.state.username);
    }

    cancel = (event) => {
        event.preventDefault();
        console.log('cancel');
        event.target.blur();
        // window.location = '/user';
    }


}

export default Settings;