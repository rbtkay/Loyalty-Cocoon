import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, DropdownItem, Modal, Input, Button, Message } from 'semantic-ui-react';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { sha256 } from 'js-sha256';
import {Link} from '../routes';

class VendorNavBar extends Component {
    state = {
        username: '',
        isOpen: false,
        modalUsername: '',
        modalPassword: '',
        submission: { msg: '', error: false }
    };

    render() {

        return (
            <div>
                <Menu fixed="top" inverted color="violet" style={{ height: "65px" }}>

                    <MenuItem>
                        <Link href={`/vendor/`}>
                            <a>Loyalty Cocoon</a>
                        </Link>
                    </MenuItem>


                    {/* <MenuItem
                        name='Transactions'
                        onClick={event => Router.pushRoute('/vendor/:id/transactions')}
                    /> */}

                    <MenuItem
                        name='Manage Products'
                        color='red'
                        onClick={this.show}
                    />

                    <Menu.Menu position="right">

                        <Dropdown text={`Welcome, ${this.state.username}`} className='item' pointing >
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={event => Router.pushRoute('/vendor/:id/settings')}>Settings</Dropdown.Item>
                                <Dropdown.Item onClick={event => Router.pushRoute('/logout')}>Logout</Dropdown.Item>
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

    onClick = async () => {
        const { modalUsername, modalPassword } = this.state;

        if (modalUsername !== "" && modalPassword !== "") {

            const hashedPassword = sha256(modalPassword);
            const response = await fetch(`http://localhost:8000/api/vendor/auth?username=${modalUsername}&password=${hashedPassword}`);

            if (response.status === 200) {
                Router.pushRoute(`/vendor/manage/` + {modalUsername});
            } else {
                this.setState({ submission: { msg: 'Invalid Username/Password', error: true } });
            }
        } else {
            console.log("state");
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
                            console.log(this.state.modalUsername);
                        }}
                    />

                    <br />

                    <Input
                        fluid
                        error
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
                            console.log(this.state.modalUsername);
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
            console.log(username);
            this.setState({ username });
        }
    }
}

export default VendorNavBar;
