import React, { Component } from 'react';
import { Form, Button, Message, Input, TextArea, Dropdown } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
import { DateInput } from 'semantic-ui-calendar-react';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import { Router } from '../routes';
import { sha256 } from 'js-sha256';

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
        date: '',
        gender: '',
        phone: '',
        preferences: '',
        country: '',
        profession: '',
        organization: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (req, res, event) => {

    }

    handleDate = (event, {name, value}) => {
        if (this.state.hasOwnProperty(name)) {
            this.setState({ [name]: value });
        }
    }

    // handleRadio = (e, { value }) => {
    //     console.log(value);
    //     this.setState({ gender: value });
    // }

    render() {
        return (
            <div>
                <Layout />
                <NavigationBar />
                <br />
                <div style={{marginLeft: 20, marginTop: 50}}>
                    <h1>Sign Up</h1>

                    <Form error={!!this.state.errorMessage["message"]}>
                        <Form.Group widths='5'>
                            <Form.Field>
                                <Input
                                    fluid
                                    name="username"
                                    value={this.state.username}
                                    onChange={event => this.setState({ username: event.target.value })}
                                    placeholder="Username"
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    fluid
                                    name="email"
                                    value={this.state.email}
                                    onChange={event => this.setState({ email: event.target.value })}
                                    placeholder="Email"
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths="5">
                            <Form.Field>
                                <Input
                                    fluid
                                    name="password"
                                    value={this.state.password}
                                    onChange={event => this.setState({ password: event.target.value })}
                                    placeholder="Password"
                                />
                            </Form.Field>

                            <Form.Field>
                                <Input
                                    fluid
                                    name="name"
                                    value={this.state.name}
                                    onChange={event => this.setState({ name: event.target.value })}
                                    placeholder="Full Name"
                                />
                            </Form.Field>
                        </Form.Group>

                        <Form.Group widths="5">
                            <Form.Field>
                                <DateInput
                                    name="date"
                                    placeholder="Date"
                                    value={this.state.date}
                                    iconPosition="left"
                                    onChange={this.handleDate}
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

                        <Form.Field width="6">
                            <Dropdown
                                name="country"
                                fluid
                                search
                                selection
                                options={countryOptions}
                                placeholder='Select Country'
                            />
                        </Form.Field>

                        <Form.Group widths="5">
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
                            <label>Gender</label>
                                <Form.Radio
                                    label='Male'
                                    value='M'
                                    checked={this.state.gender === 'M'}
                                    onChange={event => this.setState({ gender: 'M' })}
                                />

                                <Form.Radio
                                    label='Medium'
                                    value='F'
                                    checked={this.state.gender === 'F'}
                                    onChange={event => this.setState({ gender: 'F' })}
                                />
                        </Form.Group>

                        <Form.Field width="3">
                            <TextArea
                                name="preferences"
                                value={this.state.preferences}
                                onChange={event => this.setState({ preferences: event.target.value })}
                                placeholder="Preferences"
                            />
                        </Form.Field>

                        <Button color="violet" onClick={this.onSubmit} loading={this.state.loading}>Sign Up!</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default SignUp;
