import React, { Component } from 'react';
import { Button, Form, Input, Segment, Icon, Modal, Divider, Popup, Message } from 'semantic-ui-react';
import faker from 'faker';
import _ from 'lodash';
import { sha256 } from 'js-sha256';
const cookie = require('../cookie');

class CompSettings extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        username: '',
        email: '',
        name: '',
        oldPassword: '',
        newPassword: '',
        confPassword: '',
        // customer
        gender: '',
        phone: '',
        country: '',
        profession: '',
        organization: '',
        // vendor
        locCountry: '',
        locCity: '',
        locStreet: '',
        locBldg: '',
        // errorHandling
        errorMessage: '',
        passwordMessage: '',
        takenUsernames: [],
        takenEmails: [],
        usernameError: false,
        emailError: false,
        oldError: false,
        matchingError: false,
        isFormValid: true,
        isUsernameOpen: false,
        isEmailOpen: false,
        isPasswordValid: true
    }

    render() {
        const user = this.props.user;

        return (
            <div id='mainDiv'>
                <Form error={!!this.state.errorMessage} autoComplete='off' onSubmit={this.onSubmit}>
                    <Segment>
                        <Form.Group widths='2' inline>
                            <Form.Field>
                                <h1>Account Settings</h1>
                            </Form.Field>
                            <Form.Button
                                color='violet'
                                inverted
                                className='btn primary'
                                content='Discard Changes'
                                onClick={this.props.cancelChanges} />
                            <Form.Button
                                positive
                                floated='right'
                                onClick={this.props.onSubmit}
                                content='Save Changes' />
                        </Form.Group>

                        <Form.Group widths='2'>
                            <Form.Field>
                                <label>Full Name</label>
                                <Form.Input
                                    placeholder={user.user_name}
                                    onChange={event => this.setState({ name: event.target.value })} />
                            </Form.Field>
                            <Popup
                                trigger={<Form.Field error={this.state.usernameError}>
                                    <label>Username</label>
                                    <Form.Input
                                        placeholder={user.user_username}
                                        onChange={event => this.usernameEvaluation(event.target.value)} />
                                </Form.Field>}
                                open={this.state.isUsernameOpen}
                                content='Username Already Exists' />
                        </Form.Group>

                        <Form.Group widths='2'>
                            <Popup
                                trigger={<Form.Field error={this.state.emailError}>
                                    <label>Email</label>
                                    <Form.Input
                                        placeholder={user.user_email}
                                        onChange={event => this.emailEvaluation(event.target.value)} />
                                </Form.Field>}
                                open={this.state.isEmailOpen}
                                content='Email Already Exists' />
                            <Form.Field>
                                <label>Password</label>
                                <Form.Button
                                    color='violet'
                                    fluid
                                    onClick={this.handleOpen}
                                    content='Change Password' />
                            </Form.Field>
                        </Form.Group>

                        {this.renderUser()}

                    </Segment>

                    <Divider />

                    <Segment color='black' inverted>
                        <h3><Icon
                            name='warning sign'
                            color='red' /> Critical Section</h3>
                        <Form.Group inline>
                            <label style={{color: 'red'}}>You will no longer be able to recover it!</label>
                            <Form.Button
                                negative
                                content='Delete Account'
                                icon='times circle'
                                onClick={this.handleDelOpen} />
                        </Form.Group>
                    </Segment>
                </Form>

                <Modal
                    open={this.state.isOpen}
                    onOpen={this.handleOpen}
                    onClose={this.handleClose}
                    closeOnDimmerClick={false}
                    size='mini'>
                    <Modal.Header>
                        <Icon name='key' /> Change Password
                    </Modal.Header>

                    <Modal.Content>
                        <Form error={!!this.state.passwordMessage} autoComplete='off'>
                            <Form.Field>
                                <label>Old Password</label>
                                <Form.Input
                                    error={this.state.oldError}
                                    type='password'
                                    onChange={event => this.setState({ oldPassword: event.target.value })}/>
                            </Form.Field>

                            <Form.Field>
                                <label>New Password</label>
                                <Form.Input
                                    error={this.state.matchingError}
                                    type='password'
                                    onChange={event => this.setState({ newPassword: event.target.value })} />
                            </Form.Field>

                            <Form.Field>
                                <label>Confirm Password</label>
                                <Form.Input
                                    error={this.state.matchingError}
                                    type='password'
                                    onChange={event => this.setState({ confPassword: event.target.value })} />
                            </Form.Field>

                            <Form.Group widths='2' inline>
                                <Form.Button
                                    negative
                                    content='Cancel'
                                    onClick={this.handleClose} />

                                <Form.Button
                                    floated='right'
                                    positive
                                    content='Save'
                                    onClick={this.changePassword} />
                            </Form.Group>

                            <Message error header="Oops!" content={this.state.passwordMessage} />
                        </Form>
                    </Modal.Content>
                </Modal>

                <Modal
                    open={this.state.isDelOpen}
                    onOpen={this.handleDelOpen}
                    onClose={this.handleDelClose}
                    dimmer='blurring'
                    size='mini'>
                    <Modal.Header>
                        <Icon name='warning sign' color='red' /> Delete Account
                    </Modal.Header>

                    <Modal.Content>
                        <h4>Are you sure you want to permanently delete your account?</h4>
                    </Modal.Content>

                    <Modal.Actions>
                        <Button
                            onClick={this.handleDelClose}
                            content='Cancel' />
                        <Button
                            onClick={this.deleteAccount}
                            content='Yes'
                            negative
                            floated='right' />
                    </Modal.Actions>
                    <br />
                </Modal>
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
                                onChange={event => this.setState({ profession: event.target.value })} />
                        </Form.Field>
                        <Form.Field>
                            <label>Organization</label>
                            <Form.Input
                                placeholder={user.cust_organization}
                                onChange={event => this.setState({ organization: event.target.value })} />
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
                        <Form.Group widths='4'>
                            <Form.Field>
                                <label>Country</label>
                                <Form.Dropdown
                                    name="country"
                                    value={this.state.locCountry}
                                    fluid
                                    search
                                    selection
                                    options={countryOptions}
                                    placeholder={user.vendor_country}
                                    onChange={(event, data) => this.setState({ locCountry: data.value })}
                                />
                            </Form.Field>
                            <Form.Field>
                                <label>City</label>
                                <Form.Input
                                    onChange={event => this.setState({ locCity:event.target.value })}
                                    placeholder={user.vendor_city} />
                            </Form.Field>
                            <Form.Field>
                                <label>Street</label>
                                <Form.Input
                                    onChange={event => this.setState({ locStreet: event.target.value })}
                                    placeholder={user.vendor_street} />
                            </Form.Field>
                            <Form.Field>
                                <label>Building</label>
                                <Form.Input
                                    onChange={event => this.setState({ locBldg: event.target.value })}
                                    placeholder={user.vendor_building} />
                            </Form.Field>
                        </Form.Group>
                    </div>
                );
            }
        }
    }

    handleOpen = (event) => {
        event.preventDefault();
        event.target.blur();
        this.setState({ isOpen: true });
    }

    handleClose = (event) => {
        event.preventDefault();
        this.setState({ isOpen: false, oldPassword: '', newPassword: '', confPassword: '' });
    }

    handleDelOpen = (event) => {
        event.preventDefault();
        event.target.blur();
        this.setState({ isDelOpen: true });
    }

    handleDelClose = (event) => {
        event.preventDefault();
        this.setState({ isDelOpen: false });
    }

    changePassword = () => {
        this.setState({ oldError: false, matchingError: false, passwordMessage: '', isPasswordValid: false });
        const user = this.props.user;
        const { oldPassword, newPassword, confPassword } = this.state;
        if (sha256(oldPassword) === user.user_password) {
            if (newPassword === confPassword && newPassword.length != 0) {
                this.setState({ isPasswordValid: true, isOpen: false });
            } else {
                this.setState({ matchingError: true, passwordMessage: 'Passwords do not match' });
            }
        } else {
            this.setState({ oldError: true, passwordMessage: 'Wrong Password' });
        }
    }

    async componentDidMount() {
        const response = await fetch(`/api/lib/usernamesEmails`);
        const result = await response.json();

        this.setState({ takenUsernames: result['usernames'], takenEmails: result['emails'] });

        var div = document.getElementById('mainDiv');
        div.onkeydown = (event) => {
            if (event.keyCode == 13) {
                event.preventDefault();
                return false;
            }
        }
    }

    usernameEvaluation = (username) => {
        this.setState({ username });
        if (this.state.takenUsernames.includes(username.toLowerCase())) {
            this.setState({ usernameError: true, isUsernameOpen: true, isFormValid: false });
        } else {
            this.setState({ usernameError: false, isUsernameOpen: false, isFormValid: true });
        }
    }

    emailEvaluation = (email) => {
        this.setState({ email });

        if (this.state.takenEmails.includes(email.toLowerCase())) {
            this.setState({ emailError: true, isEmailOpen: true, isFormValid: false });
        } else {
            this.setState({ emailError: false, isEmailOpen: false, isFormValid: true });
        }
    }

    onSubmit = async () => {
        const { username, email, name, newPassword, usernameError, emailError, isFormValid } = this.state;

        const user = this.props.user;

        if (isFormValid) {
            let qUsername, qEmail, qName, qNewPassword;
            if (username == '') {
                qUsername = user.user_username;
            } else {
                qUsername = username;
            }
            if (email == '') {
                qEmail = user.user_email;
            } else {
                qEmail = email;
            }
            if (name == '') {
                qName = user.user_name;
            } else {
                qName = name;
            }
            if (newPassword == '') {
                qNewPassword = user.user_password;
            } else {
                qNewPassword = sha256(newPassword);
            }

            // user
            if (user.user_isVendor.data[0] == 0) {
                const { gender, phone, country, profession, organization } = this.state;
                let qGender, qPhone, qCountry, qProfession, qOrganization;
                if (gender == '') {
                    qGender = user.cust_gender;
                } else {
                    qGender = gender;
                }
                if (phone == '') {
                    qPhone = user.cust_phone;
                } else {
                    qPhone = phone;
                }
                if (country == '') {
                    qCountry = user.cust_country;
                } else {
                    qCountry = country;
                }
                if (profession == '') {
                    qProfession = user.cust_profession;
                } else {
                    qProfession = profession;
                }
                if (organization == '') {
                    qOrganization = user.cust_organization;
                } else {
                    qOrganization = organization;
                }

                const response = await fetch(`/api/user/update?profile=${user.user_username}&username=${qUsername}&email=${qEmail}&name=${qName}&password=${qNewPassword}&gender=${qGender}&phone=${qPhone}&country=${qCountry}&profession=${qProfession}&organization=${qOrganization}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });

                if (response.status == 200) {
                    this.props.success();
                } else {
                    this.setState({ errorMessage: 'Something went wrong...' });
                }
            } else {
                const { locCountry, locCity, locStreet, locBldg } = this.state;
                let qCountry, qCity, qStreet, qBldg;
                if (locCountry == '') {
                    qCountry = user.vendor_country;
                } else {
                    qCountry = locCountry;
                }
                if (locCity == '') {
                    qCity = user.vendor_city;
                } else {
                    qCity = locCity;
                }
                if (locStreet == '') {
                    qStreet = user.vendor_street;
                } else {
                    qStreet = locStreet;
                }
                if (locBldg == '') {
                    qBldg = user.vendor_building;
                } else {
                    qBldg = locBldg;
                }

                const response = await fetch(`/api/vendor/update?username=${qUsername}&email=${qEmail}&name=${qName}&password=${qNewPassword}&country=${qCountry}&city=${qCity}&street=${qStreet}&building=${qBldg}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });

                if (response.status == 200) {
                    this.props.success();
                } else {
                    this.setState({ errorMessage: 'Something went wrong...' });
                }
            }
        }
    }

    deleteAccount = async () => {
        const user = this.props.user;

        if (user.user_isVendor.data[0] == 0) {
            const response = await fetch(`/api/user/delete?id=${user.user_id}&username=${user.user_username}&email=${user.user_email}`, {
                headers: new Headers({
                    'authorization': cookie.getCookie('authorization')
                })
            });
            if (response.status == 200) {
                this.props.delete();
                cookie.deleteCookie();
            }
        } else {
            const response = await fetch(`/api/vendor/delete?id=${user.user_id}&username=${user.user_username}&email=${user.user_email}`, {
                headers: new Headers({
                    'authorization': cookie.getCookie('authorization')
                })
            });
            if (response.status == 200) {
                this.props.delete();
                cookie.deleteCookie();
            }
        }
    }

}

export default CompSettings;