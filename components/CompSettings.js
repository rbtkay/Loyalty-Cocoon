import React, { Component } from 'react';
import { Button, Form, Input, Segment } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
class CompSettings extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        email: '',
        name: '',
        password: '',
        // customer
        gender: '',
        phone: '',
        country: '',
        prefs: '',
        dob: '',
        profession: '',
        organization: '',
        // vendor
        location: '',
        tag: ''
    }

    render() {


        const user = this.props.user;
        // console.log('THE USER: ', user);

        return (
            <div>
                <Form>
                    <Form.Group widths='2' inline>
                        <Form.Field>
                            <h1>Account Settings</h1>
                        </Form.Field>
                        <Form.Button
                            positive
                            floated='right'
                            onClick={this.props.onSubmit}
                            content='Save Changes' />
                        <Form.Button
                            floated='right'
                            content='Discard Changes' />
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <label>Full Name</label>
                            <Form.Input
                                placeholder={user.user_name}
                                onChange={event => this.setState({ name: event.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Username</label>
                            <Form.Input
                                placeholder={user.user_username}
                                onChange={event => this.setState({ username: event.target.value })} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <label>Email</label>
                            <Form.Input
                                placeholder={user.user_email}
                                onChange={event => this.setState({ email: event.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Password</label>
                            <Form.Button
                                color='violet'
                                fluid
                                onClick={this.showPassword}
                                content='Change Password' />
                        </Form.Field>
                    </Form.Group>

                    {this.renderUser()}

                    <Segment color='grey' inverted>
                        <h3>Critical Section</h3>
                        <Form.Group inline>
                            <label style={{color: 'red'}}>You will no longer be able to recover it!</label>
                            <Form.Button
                                negative
                                content='Delete Account'
                                />
                        </Form.Group>
                    </Segment>


                </Form>
            </div>
        );
    }

    renderUser() {

        const countryOptions = _.map(faker.definitions.address.country, country => ({
            key: country,
            text: country,
            value: country,
        }));

        const user = this.props.user;
        if (!_.isEmpty(user)) {
            if (user.user_isVendor.data[0] == 0) {
                return (
                    <div>
                        <Form.Group widths='2'>
                        <Form.Field>
                            <label>Phone</label>
                            <Form.Input
                                placeholder={user.cust_phone}
                                onChange={event => this.setState({ phone: event.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Country</label>
                            <Form.Dropdown
                                name="country"
                                value={this.state.country}
                                fluid
                                search
                                selection
                                options={countryOptions}
                                placeholder={user.cust_country}
                                onChange={(event, data) => this.setState({ country: data.value })}
                            />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group widths='2'>
                        <Form.Field>
                            <label>Profession</label>
                            <Form.Input
                                placeholder={user.cust_profession}
                                onChange={event => this.setState({ profession })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <Form.Input
                                placeholder={user.cust_organization}
                                onChange={event => this.setState({ organization })} />
                        </Form.Field>
                    </Form.Group>

                    <Form.Group inline>
                        <label>Gender: </label>
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
                </div>
                );
            } else {
                return (
                    <div>
                        <h4>Location</h4>
                        <Form.Group widths='3'>
                            <Form.Field>
                                <label>Country</label>
                                <Form.Input
                                    placeholder={user.vendor_location}
                                    onChange={event => this.setState({ locCountry: event.target.location })} />
                            </Form.Field>
                            <Form.Field>
                                <label>City</label>
                                <Form.Input
                                    onChange={event => this.setState({ locCity })} />
                            </Form.Field>
                            <Form.Field>
                                <label>Street, Bldg</label>
                                <Form.Input
                                    onChange={event => this.setState({ locStreetBldg })} />
                            </Form.Field>
                        </Form.Group>
                    </div>
                );
            }
        }
    }

}

export default CompSettings;