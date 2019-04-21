import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Dropdown, Segment, Container, Popup } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import { sha256 } from 'js-sha256';
import web3 from '../../ethereum/web3';
import NavBar from '../../components/NavBar';
let cookie = require('../../cookie');

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        name: '',
        phone: '',
        location: '',
        usernameError: false,
        emailError: false,
        passwordError: false,
        nameError: false,
        phoneError: false,
        locationError: false,
        tag: '',
        errorMessage: '',
        successMessage: '',
        isFormEmpty: false,
        isFormValid: true,
        loading: false,
        takenUsernames: [],
        takenEmails: [],
        usernameError: false,
        emailError: false,
        isUsernameOpen: false,
        isEmailOpen: false
    };

    onSubmit = async (req, res, event) => {
        await this.setState({ loading: true, errorMessage: '', isFormEmpty: false, isFormValid: true });

        const { username, email, password, name, phone, location, tag } = this.state;

        if (username === '') {
            await this.setState({ usernameError: true, isFormEmpty: true });
        }
        if (email === '') {
            await this.setState({ emailError: true, isFormEmpty: true });
        }
        if (password === '') {
            await this.setState({ passwordError: true, isFormEmpty: true });
        }
        if (name === '') {
            await this.setState({ nameError: true, isFormEmpty: true });
        }
        if (phone === '') {
            await this.setState({ phoneError: true, isFormEmpty: true });
        }
        if (location === '') {
            await this.setState({ locationError: true, isFormEmpty: true });
        }


        if (this.state.isFormEmpty === false) {
            const emailRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

            if (!emailRegEx.test(email)) {
                await this.setState({ isFormValid: false, emailError: true, errorMessage: 'Email is Invalid' });
            } else if (this.state.isEmailOpen === true || this.state.isUsernameOpen === true) {
                await this.setState({ isFormValid: false, errorMessage: 'Some Fields are Invalid' });
            }

            if (this.state.isFormValid === true) {
                const hashedPassword = sha256(password);
                try {
                    const newAccount = web3.eth.accounts.create();

                    var response = await fetch(`/api/auth/vendorSignUp?username=${username}&email=${email}&password=${hashedPassword}&name=${name}&phone=${phone}&location=${location}&address=${newAccount["address"]}`);
                    var data = await response.json();

                    if (data.token) {
                        cookie.setCookie('authorization', data.token, 100);
                        cookie.setCookie('username', username, 100);
                        cookie.setCookie('address', newAccount['address'], 100);

                        // this.sendConfirmation();
                        this.setState({ successMessage: "We've sent you a Confirmation Email" });

                    } else {
                        this.setState({ errorMessage: data["message"] });
                    }
                } catch (err) {
                    throw err;
                }
            } else {
                await this.setState({ isFormValid: false, errorMessage: 'Some Fields are Invalid' });
            }
        } else {
            this.setState({ errorMessage: 'Some Fields are Empty' });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <div>
                <Layout />
                <NavBar />
                <Segment inverted color='violet'>
                    <br />
                    <br />
                    <br />
                    <div className="ui raised very padded text container segment">
                        <h1>Sign Up</h1>

                        <Form error={!!this.state.errorMessage} success={!!this.state.successMessage} autoComplete="off">
                            <Form.Group widths='2'>
                                <Form.Field error={this.state.nameError}>
                                    <Input
                                        fluid
                                        name='name'
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value, nameError: false })}
                                        placeholder="Full Name"
                                    />
                                </Form.Field>

                                <Form.Field error={this.state.usernameError}>
                                    <Popup
                                        trigger={
                                            <Input
                                                fluid
                                                name="username"
                                                value={this.state.username}
                                                onChange={event => this.usernameEvaluation(event.target.value)}
                                                placeholder="Username"
                                            />}
                                        open={this.state.isUsernameOpen}
                                        content='Username Already Exists' />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field error={this.state.emailError}>
                                    <Popup
                                        trigger={
                                            <Input
                                                fluid
                                                name="email"
                                                value={this.state.email}
                                                onChange={event => this.emailEvaluation(event.target.value)}
                                                placeholder="Email"
                                            />}
                                        open={this.state.isEmailOpen}
                                        content='Emails Already Exists' />
                                </Form.Field>

                                <Form.Field error={this.state.passwordError}>
                                    <Input
                                        fluid
                                        name="password"
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value, passwordError: false })}
                                        placeholder="Password"
                                        type="password"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths='2'>
                                <Form.Field error={this.state.phoneError}>
                                    <Input
                                        fluid
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={event => this.setState({ phone: event.target.value, phoneError: false })}
                                        placeholder="Phone"
                                    />
                                </Form.Field>

                                <Form.Field error={this.state.locationError}>
                                    <Input
                                        fluid
                                        name="location"
                                        value={this.state.location}
                                        onChange={event => this.setState({ location: event.target.value, locationError: false })}
                                        placeholder="Location"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Message error header="Oops!" content={this.state.errorMessage}></Message>
                            <Message success header="Congrats!" content={this.state.successMessage}></Message>

                            <Button color="violet" onClick={this.onSubmit} loading={this.state.loading}>Sign Up!</Button>
                        </Form>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Segment>
            </div>
        );
    }

    async componentDidMount() {
        const response = await fetch(`/api/lib/usernamesEmails`);
        const result = await response.json();

        await this.setState({ takenUsernames: result['usernames'], takenEmails: result['emails'] });
    }

    usernameEvaluation = async (username) => {
        await this.setState({ username });

        if (this.state.takenUsernames.includes(username.toLowerCase())) {
            this.setState({ usernameError: true, isUsernameOpen: true });
        } else {
            this.setState({ usernameError: false, isUsernameOpen: false });
        }
    }

    emailEvaluation = async (email) => {
        await this.setState({ email });

        if (this.state.takenEmails.includes(email.toLowerCase())) {
            this.setState({ emailError: true, isEmailOpen: true });
        } else {
            this.setState({ emailError: false, isEmailOpen: false });
        }
    }

    // async sendConfirmation() {
    //     const { username, email } = this.state;

    //     try {
    //         var response = await fetch(`/api/lib/confirmEmail?username=${username}&email=${email}`);

    //     } catch (err) {
    //         throw err;
    //     }
    // }
}

export default SignUp;