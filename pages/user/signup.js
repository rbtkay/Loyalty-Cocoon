import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Dropdown, Segment, Container } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
import { DateInput } from 'semantic-ui-calendar-react';
import Layout from '../../components/Layout';
import NavigationBar from '../../components/NavigationBar';
import { Router } from '../../routes';
import { sha256 } from 'js-sha256';
import web3 from '../../ethereum/web3';


const countryOptions = _.map(faker.definitions.address.country, country => ({
    key: country,
    text: country,
    value: country,
}));

class SignUp extends Component {
    state = {
        username: '',
        email: '',
        password: '',
        name: '',
        dob: '',
        gender: '',
        phone: '',
        preferences: '',
        country: '',
        profession: '',
        organization: '',
        errorMessage: '',
        usernameError: false,
        nameError: false,
        emailError: false,
        passwordError: false,
        usernameError: false,
        isFormEmpty: false,
        isFormValid: true,
        loading: false
    };

    render() {
        return (
            <div>
                <Layout />

                <Segment inverted color='violet'>
                    <br />
                    <br />
                    <div className="ui raised very padded text container segment">
                        <h1>Join Millions of Shoppers</h1>

                        <Form error={!!this.state.errorMessage} autoComplete="off">
                            <Form.Group widths='2'>
                                <Form.Field error={this.state.nameError}>
                                    <Input
                                        fluid
                                        name="name"
                                        value={this.state.name}
                                        onChange={event => this.setState({ name: event.target.value })}
                                        placeholder="Full Name"
                                    />
                                </Form.Field>

                                <Form.Field error={this.state.usernameError}>
                                    <Input
                                        fluid
                                        name="username"
                                        value={this.state.username}
                                        onChange={event => this.setState({ username: event.target.value })}
                                        placeholder="Username"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="2">
                                <Form.Field error={this.state.emailError}>
                                    <Input
                                        fluid
                                        name="email"
                                        value={this.state.email}
                                        onChange={event => this.setState({ email: event.target.value })}
                                        placeholder="Email"
                                    />
                                </Form.Field>

                                <Form.Field error={this.state.passwordError}>
                                    <Input
                                        fluid
                                        name="password"
                                        value={this.state.password}
                                        onChange={event => this.setState({ password: event.target.value })}
                                        placeholder="Password"
                                        type='password'
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group widths="2">
                                <Form.Field>
                                    <DateInput
                                        name="dob"
                                        placeholder="Date"
                                        value={this.state.dob}
                                        iconPosition="left"
                                        onChange={this.handleDate}
                                        dateFormat="YYYY-MM-DD"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        name="phone"
                                        value={this.state.phone}
                                        onChange={event => this.setState({ phone: event.target.value })}
                                        placeholder="Phone Number"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Field width="16">
                                <Dropdown
                                    name="country"
                                    value={this.state.country}
                                    fluid
                                    search
                                    selection
                                    options={countryOptions}
                                    placeholder='Select Country'
                                    onChange={(event, data) => this.setState({ country: data.value })}
                                />
                            </Form.Field>

                            <Form.Group widths="2">
                                <Form.Field>
                                    <Input
                                        name="profession"
                                        value={this.state.profession}
                                        onChange={event => this.setState({ profession: event.target.value })}
                                        placeholder="Profession"
                                    />
                                </Form.Field>

                                <Form.Field>
                                    <Input
                                        name="organization"
                                        value={this.state.organization}
                                        onChange={event => this.setState({ organization: event.target.value })}
                                        placeholder="Organization"
                                    />
                                </Form.Field>
                            </Form.Group>

                            <Form.Group>
                                <Form.Field>
                                    <label>Gender</label>
                                </Form.Field>
                                <Form.Radio
                                    label='Male'
                                    value='M'
                                    checked={this.state.gender === 'M'}
                                    onChange={event => this.setState({ gender: 'M' })}
                                />

                                <Form.Radio
                                    label='Female'
                                    value='F'
                                    checked={this.state.gender === 'F'}
                                    onChange={event => this.setState({ gender: 'F' })}
                                />
                            </Form.Group>

                            <Form.Field width="16">
                                <TextArea
                                    name="preferences"
                                    value={this.state.preferences}
                                    onChange={event => this.setState({ preferences: event.target.value })}
                                    placeholder="Preferences"
                                />
                            </Form.Field>
                            <Message error header="Oops!" content={this.state.errorMessage}></Message>
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

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: '' });

        const { username, email, password, name, dob, gender, phone, preferences, country, profession, organization } = this.state;

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

        if (this.state.isFormEmpty === false) {
            const emailRegEx = new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/);

            if (!emailRegEx.test(email)) {
                await this.setState({ emailError: true, isFormValid: false, errorMessage: 'Email is not Valid' });
            }

            if (this.state.isFormValid) {
                // const hashedPassword = sha256(password);

                // try {
                //     const newAccount = web3.eth.accounts.create();
                //     var response = await fetch(`http://localhost:8000/api/auth/userSignUp?username=${username}&email=${email}&password=${hashedPassword}&name=${name}&dob=${dob}&gender=${gender}&phone=${phone}&prefs=${preferences}&address=${newAccount["address"]}&country=${country}&profession=${profession}&organization=${organization}`);
                //     var data = await response.json();
                //     if (data.token) {
                //         localStorage.setItem('username', username);
                //         localStorage.setItem('address', newAccount["address"]);
                //         localStorage.setItem('authorization', data.token);
                //         Router.pushRoute('/user');
                //     } else {
                //         this.setState({ errorMessage: data['message'] });
                //     }
                // } catch (err) {
                //     throw err;
                // }
                this.setState({ errorMessage: 'Inserting User...' });
            }
        } else {
            this.setState({ errorMessage: 'Some Field are Empty' });
        }
        this.setState({ loading: false });
    }

    handleDate = (event, { name, value }) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({
                [name]: value
            });
        }
    }
}

export default SignUp;