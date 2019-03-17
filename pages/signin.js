import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import { Router } from '../routes';
import { sha256 } from 'js-sha256';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        errorMessage: {message: ''},
        data: {}
    };

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: {message: ''} });

        console.log(this.state.errorMessage);

        const { username, password } = this.state;
        const hashedPassword = sha256(password);

        try {
            var response = await fetch(`http://localhost:8000/api/user/auth?username=${username}&password=${hashedPassword}`);
            var data = await response.json();
            if (/* data.length > 0 && data[0]["user_username"] == username */ data.token)
            {
                console.log("data from signin: " + JSON.stringify(data));
                req['authorization'] = data.token;
                localStorage.setItem('authorization', data.token);
                localStorage.setItem('username', data.result[0]["user_username"]);
                localStorage.setItem('address', data.result[0]["user_address"]);
                Router.pushRoute("/");
                // console.log(req['authorization']);
            } else {
                this.setState({ errorMessage: data });
                console.log(this.state.errorMessage);
            }
        } catch (err) {
            throw err;
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <div style={{marginLeft: 20}}>
                    <h1>Sign In</h1>
                    <Form error={!!this.state.errorMessage["message"]}>
                        <Form.Field width="3">
                            <label>Username</label>
                            <Input
                                name="username"
                                value={this.state.username}
                                onChange={event => this.setState({ username: event.target.value })}
                            />
                        </Form.Field>

                        <Form.Field width="3">
                            <label>Password</label>
                            <Input
                                name="password"
                                value={this.state.password}
                                onChange={event => this.setState({ password: event.target.value })}
                            />
                        </Form.Field>
                        <Message error header="Oops!" content={this.state.errorMessage["message"]}></Message>
                        <Button marginleft="3" color="violet" onClick={this.onSubmit} loading={this.state.loading}>Sign In!</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignIn;
