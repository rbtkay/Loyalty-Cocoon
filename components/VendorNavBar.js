import React, { Component } from 'react';
import { Menu, MenuItem, Dropdown, DropdownItem, Modal, Input, Button, Form } from 'semantic-ui-react';
import { Router } from '../routes';
import loco from '../ethereum/loco';

class VendorNavBar extends Component {
    state = {
        username: '',
        isOpen: false,
        modalUsername: '',
        modalPassword: ''
    };

    render() {

        return (
            <div>
                <Menu fixed="top" inverted color="violet" style={{height: "65px"}}>

                    <MenuItem
                        name='Loyalty Cocoon'
                        onClick={event => Router.pushRoute(`/vendor/`)}
                    />

                    <MenuItem
                        name='Transactions'
                        onClick={event => Router.pushRoute('/vendor/:id/transactions')}
                    />

                    <MenuItem
                        name='Manage Products'
                        color='red'
                        onClick={ this.show }
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

                        <Input
                            name="modalUsername"
                            placeholder="Username"
                            value={this.state.modalUsername}
                            onChange={event => this.setState({ modalUsername: event.target.value })}
                        />

                        <br />

                        <Input
                            name="modalPassword"
                            placeholder="Password"
                            value={this.state.modalPassword}
                            onChange={event => this.setState({ modalPassword: event.target.value })}
                        />

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

    async onClick() {
        const { modalUsername, modalPassword } = this.state;

        //TODO: implement vendor api
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
