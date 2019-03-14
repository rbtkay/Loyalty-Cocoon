import React, { Component } from 'react';
import { Form, Button, Message, Input } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        errorMessage: {message: ''},
        data: {}
    };

    onSubmit = async (req, res, event) => {
        // event.preventDefault();
        this.setState({ loading: true, errorMessage: {message: ''} });

        console.log(this.state.errorMessage);

        const { username, password } = this.state;

        try {
            var response = await fetch(`http://localhost:8000/api/user/auth?username=${username}&password=${password}`);
            var data = await response.json();
            if (/* data.length > 0 && data[0]["user_username"] == username */ data.token)
            {
                console.log(data.username);
                req['authorization'] = data.token;
                localStorage.setItem('authorization', data.token);
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
                <h1>Sign In</h1>
                <Form error={!!this.state.errorMessage["message"]}>
                    <Form.Field>
                        <label>Username</label>
                        <Input
                            name="username"
                            value={this.state.username}
                            onChange={event => this.setState({ username: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Password</label>
                        <Input
                            name="password"
                            value={this.state.password}
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage["message"]}></Message>
                    <Button primary onClick={this.onSubmit} loading={this.state.loading}>Sign In!</Button>
                </Form>
            </div>
        );
    }
}

export default SignIn;
