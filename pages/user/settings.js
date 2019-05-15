import React, { Component } from 'react';
import NavigationBar from '../../components/NavigationBar';
import Layout from '../../components/Layout';
import CompSettings from '../../components/CompSettings';
import { Segment } from 'semantic-ui-react';
import { getCookie } from '../../cookie';
import { SemanticToastContainer, toast } from 'react-semantic-toasts';
import Footer from '../../components/Footer';

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
                <SemanticToastContainer />
                <Segment color='violet' inverted>
                    <Segment>
                        <CompSettings user={this.state.user} cancelChanges={this.cancel} success={this.showSuccessToast} delete={this.showDeleteToast}/>
                        <br /> <br /> <br />
                    </Segment>
                </Segment>
                <Footer />
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

    showSuccessToast = () => {
        setTimeout(() => {
            toast({
                type: "success",
                icon: "thumbs up",
                title: "Settings saved successfully!",
                description: "Your changes have been saved. Close this message to return to home screen.",
                time: 0,
                onClick: () => { window.location.href = '/user' },
                onClose: () => { window.location.href = '/user' }
            }, 500);
        });
    }

    showDeleteToast = () => {
        setTimeout(() => {
            toast({
                type: "error",
                icon: "warning sign",
                title: "Account Deleted",
                description: "You have deleted your account. Would you be kind enough to fill out this survey to rate us?",
                time: 0,
                onClick: () => { window.location.href = '/' },
                onClose: () => { window.location.href = '/' }
            }, 500);
        });
    }

    cancel = (event) => {
        event.preventDefault();
        event.target.blur();
        window.location = '/user';
    }
}

export default Settings;