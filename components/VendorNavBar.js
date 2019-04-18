import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, DropdownItem, Modal, Input, Button, Message, Image, Form, Icon } from 'semantic-ui-react';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { sha256 } from 'js-sha256';
import { Link } from '../routes';
let cookie = require('../cookie');

class VendorNavBar extends Component {
    input;
    state = {
        username: '',
        isOpen: false,
        modalUsername: '',
        modalPassword: '',
        submission: { msg: '', error: false },
        referralOpen: false,
        referralEmail: ''
    };

    constructor(props) {
        super(props);
    };

    render() {

        return (
            <div>
                <Menu fixed="top" inverted color="violet" style={{ height: "65px" }}>

                    <MenuItem>
                        <Link href={`/vendor`}>
                            <a><Image circular src='/static/Logo.gif' centered size='mini' /></a>
                        </Link>
                    </MenuItem>

                    <MenuItem
                        name='Manage Products'
                        onClick={this.show}
                    />

                    <MenuItem
                        name='Dashboards'
                        onClick={this.dashboard}
                    />

                    <Menu.Menu position="right">
                        {this.renderReferral()}
                        <MenuItem>
                            <Button
                                inverted
                                icon='user plus'
                                content='Refer'
                                onClick={this.handleRefClick}></Button>
                        </MenuItem>
                        <Dropdown text={`Welcome ${this.state.username}`} className='item' pointing >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={this.settings}>Settings</Dropdown.Item>
                                <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                    </Menu.Menu>
                </Menu>

                <Modal open={this.state.isOpen} onClose={this.close} size="mini" centered={false} dimmer='blurring'>
                    <Modal.Header>Login to continue...</Modal.Header>
                    <Modal.Content>

                        {this.renderModal()}

                    </Modal.Content>
                    <Modal.Actions>
                        <Button negative onClick={this.onClick}>Verify</Button>
                    </Modal.Actions>
                </Modal>
            </div>
        );
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    logout = () => {
        cookie.deleteCookie();
        Router.pushRoute('/');
    }

    dashboard = () => {
        Router.pushRoute('/vendor/dashboard');
    }

    settings = () => {
        Router.pushRoute(`/vendor/settings/${this.state.username}`);
    }

    onClick = async () => {
        const { modalUsername, modalPassword } = this.state;
        this.setState({ submission: { msg: '', error: false } });

        if (modalUsername !== '' && modalPassword !== '') {
            if (modalUsername.toLowerCase() === cookie.getCookie('username').toLowerCase()) {

                const hashedPassword = sha256(modalPassword);
                try {
                    const response = await fetch(`/api/auth/login?username=${modalUsername}&password=${hashedPassword}`);
                    const res = await response.json();

                    const username = res['result'][0].user_username;

                    if (response.status === 200) {
                        Router.pushRoute(`/vendor/manage/${modalUsername}`);
                    } else {
                        this.setState({ submission: { msg: 'Invalid Username/Password', error: true } });
                    }
                } catch (err) {
                    this.setState({ submission: { msg: 'Oops, Something went wrong...', error: true } });
                }
            } else {
                this.setState({ submission: { msg: 'Invalid Username/Password', error: true } });
            }
        } else {
            this.setState({ submission: { msg: 'Fields Required', error: true } });
        }
    }
    //TODO: make manage Product HyperLink Model a form!
    //FIXME: VErify button should load
    renderModal() {
        if (this.state.submission['error']) {
            return (
                <div>

                    <Input
                        fluid
                        error
                        name="modalUsername"
                        placeholder="Username"
                        value={this.state.modalUsername}
                        onChange={event => {
                            this.setState({ modalUsername: event.target.value })
                        }}
                    />

                    <br />

                    <Input
                        type="password"
                        fluid
                        name="modalPassword"
                        placeholder="Password"
                        value={this.state.modalPassword}
                        onChange={event => this.setState({ modalPassword: event.target.value })}
                    />
                    <Message error header='Oops!' content={this.state.submission['msg']} ></Message>
                </div>
            )
        } else {
            return (
                <div>
                    <Input
                        fluid
                        name="modalUsername"
                        placeholder="Username"
                        value={this.state.modalUsername}
                        onChange={event => {
                            this.setState({ modalUsername: event.target.value })
                        }}
                    />

                    <br />

                    <Input
                        fluid
                        name="modalPassword"
                        placeholder="Password"
                        type="password"
                        value={this.state.modalPassword}
                        onChange={event => this.setState({ modalPassword: event.target.value })}
                    />
                </div>
            )
        }
    }

    async componentDidMount() {
        const auth = cookie.getCookie('authorization');

        if (auth === null) {
            Router.pushRoute('/');
        } else {
            const account = cookie.getCookie('address');
            const username = cookie.getCookie('username');
            this.setState({ username });
        }
    }

    handleRefClick = () => {
        if (!this.state.referralOpen) {
            this.renderReferral();
            this.setState({ referralOpen: true, referralEmail: '' });
        } else {
            this.setState({ referralOpen: false });
        }
    }

    renderReferral = () => {
        let input;
        if (this.state.referralOpen) {
            return (
                <MenuItem>
                    <Form onSubmit={this.refer}>
                        <Form.Input
                            placeholder='Customer Email'
                            onChange={event => this.setState({ referralEmail: event.target.value })}/>
                    </Form>
                </MenuItem>
            );
        }
    }

    refer = async () => {
        const { referralEmail } = this.state;
        const response = await fetch(`/api/lib/referral?email=${referralEmail}&vendorUsername=${cookie.getCookie('username')}`);

        if (response.status === 200) {
            alert(`Referral Email Sent to ${this.state.referralEmail}`);
        } else if (response.status === 409) {
            alert(`User with email ${this.state.referralEmail} already exists!`);
        } else if (response.status === 404) {
            alert(`Email address not found`);
        }
    }
}

export default VendorNavBar;