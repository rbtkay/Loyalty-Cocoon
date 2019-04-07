import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, DropdownItem, Modal, Input, Button, Message, Image, Form } from 'semantic-ui-react';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { sha256 } from 'js-sha256';
import { Link } from '../routes';

class VendorNavBar extends Component {

    state = {
        username: '',
        isOpen: false,
        modalUsername: '',
        modalPassword: '',
        submission: { msg: '', error: false }
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
                        color='red'
                        onClick={this.show}
                    />

                    <Menu.Menu position="right">

                        <Dropdown text={`Welcome, ${this.state.username}`} className='item' pointing >
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
        localStorage.clear();
        Router.pushRoute('/');
    }

    settings = () => {
        Router.pushRoute(`/vendor/settings/${this.state.username}`);
    }

    onClick = async () => {
        const { modalUsername, modalPassword } = this.state;

        console.log("alo?")
        if (modalUsername !== '' && modalPassword !== '') {

            const hashedPassword = sha256(modalPassword);
            const response = await fetch(`http://localhost:8000/api/auth/vendorLogin?username=${modalUsername}&password=${hashedPassword}`);
            const res = await response.json();

            const username = res['result'][0].vendor_username;

            if (response.status === 200) {
                Router.pushRoute(`/vendor/manage/${modalUsername}`);
            } else {
                this.setState({ submission: { msg: 'Invalid Username/Password', error: true } });
            }
        } else {
            this.setState({ submission: { msg: 'Fields Required', error: true } });
        }
    }

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
                        value={this.state.modalPassword}
                        onChange={event => this.setState({ modalPassword: event.target.value })}
                    />
                </div>
            )
        }
    }

    async componentDidMount() {
        const auth = localStorage.getItem('authorization');

        if (auth === null) {
            Router.pushRoute('/');
        } else {
            const account = localStorage.getItem('address');
            const username = localStorage.getItem('username');
            this.setState({ username });
        }
    }
}

export default VendorNavBar;