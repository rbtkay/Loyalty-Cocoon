import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, DropdownItem, Modal, Input, Button, Message, Image, Form, Icon } from 'semantic-ui-react';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { Link } from '../routes';
let cookie = require('../cookie');

class VendorNavBar extends Component {
    input;
    state = {
        username: '',
        modalUsername: '',
        modalPassword: '',
        submission: { msg: '', error: false },
        referralOpen: false,
        referralEmail: '',
        isVerifyLoading: false
    };

    constructor(props) {
        super(props);
        console.log('in the vendor navbar!!!');
    };

    render() {
        const { isVerifyLoading } = this.state;
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

                
            </div>
        );
    }

    show = () => {
        Router.pushRoute('/vendor/manage');
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
                            onChange={event => this.setState({ referralEmail: event.target.value })} />
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