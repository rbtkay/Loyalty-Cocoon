import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Dropdown, Segment, Container } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import { sha256 } from 'js-sha256';
import web3 from '../../ethereum/web3';

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        location: '',
        tag: '',
        errorMessage: {message: '' },
        loading: false
    };

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: { message: '' } });

        const { username, email, password, name, phone, location, tag } = this.state;
        const hashedPassword = sha256(password);

        try {
            const newAccount = web3.eth.accounts.create();

            var response = await fetch(`http://localhost:8000/api/auth/vendorSignUp?username=${username}&email=${email}&password=${hashedPassword}&name=${name}&phone=${phone}&location=${location}&address=${newAccount["address"]}`);
            var data = await response.json();
            
            if (data.token) {
                localStorage.setItem('authorization', data.token);
                localStorage.setItem('username', username);
                localStorage.setItem('address', newAccount['address']);
                Router.pushRoute('/vendor');
            } else {
                this.setState({ errorMessage: data });
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

                <Segment inverted color='violet'>
                    <br />
                    <br />
                    <div className="ui raised very padded text container segment">
                        <h1>Sign Up</h1>

                        <Form error={!!this.state.errorMessage["message"]} autoComplete="off">
                            <Form.Group widths='2'>
                                <Form.Field>
                                    <Input
                                        fluid
                                        name='name'
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value })}
                                        placeholder="Full Name"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        fluid
                                        name="username"
                                        value={this.state.username}
                                        onChange={event => this.setState({ username: event.target.value })}
                                        placeholder="Username"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <Input
                                        fluid
                                        name="email"
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}
                                        placeholder="Email"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        fluid
                                        name="password"
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field>
                                    <Input
                                        fluid
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={event => this.setState({ phone: event.target.value })}
                                        placeholder="Phone"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        fluid
                                        name="location"
                                        value={this.state.location}
                                        onChange={event => this.setState({ location: event.target.value })}
                                        placeholder="Location"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Message error header="Oops!" content={this.state.errorMessage["message"]}></Message>
                            <Button color="violet" onClick={this.onSubmit} loading={this.state.loading}>Sign Up!</Button>
                        </Form>
                    </div>
                    <br />
                    <br />
                    <br />
                </Segment>
            </div>
        );
    }
}

export default SignUp;
