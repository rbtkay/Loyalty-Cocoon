import React, { Component } from 'react';
import { Input, Menu, MenuItem, Dropdown, DropdownItem, Search, Form } from 'semantic-ui-react';
import indexPage from '../pages/user';
import { Router } from '../routes';
import loco from '../ethereum/loco';

class NavigationBar extends Component {
    state = {
        username: '',
        balance: 0,
        isVendor: false
    };

    render() {
        const categories = ['Electronics', 'Food', 'Clothing', 'Toys', 'Groceries'];

        return (
            <Menu fixed="top" inverted color="violet">

                <MenuItem
                    name='Loyalty Cocoon'
                    onClick={event => Router.pushRoute(`/user/${this.state.username}`)}
                />

                <MenuItem
                    name='Purchases'
                    onClick={event => Router.pushRoute('/user/:id/purchases')}
                />

                <Dropdown text='Categories' pointing className='item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>{categories[0]}</Dropdown.Item>
                        <Dropdown.Item>{categories[1]}</Dropdown.Item>
                        <Dropdown.Item>{categories[2]}</Dropdown.Item>
                        <Dropdown.Item>{categories[3]}</Dropdown.Item>
                        <Dropdown.Item>{categories[4]}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Menu position="right">

                    <MenuItem style={{marginRight: 300}}>
                        <Form>
                            <Form.Input
                                icon='search'
                                placeholder='Search...'
                                onChange={event => this.search(event.target.value)}
                            />
                        </Form>
                    </MenuItem>

                    <Dropdown text={`Welcome, ${this.state.username}`} className='item' pointing >
                        <Dropdown.Menu>
                            <Dropdown.Header style={{textAlign:"right"}}>{this.state.balance} LOCO</Dropdown.Header>
                            <Dropdown.Item onClick={event => Router.pushRoute('/user/:id/settings')}>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={event => Router.pushRoute('/logout')}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Menu>
            </Menu>
        );
    }

    async componentDidMount() {
        const auth = localStorage.getItem('authorization');

        if (auth === null) {
            Router.pushRoute("/signin");
        } else {
            const account = localStorage.getItem('address');
            const username = localStorage.getItem('username');
            console.log(username);
            const balance = await loco.methods.balances(account).call();
            this.setState({ username, balance });
        }
    }

    search = async (event) => {
        // if (event.keyPress === 'enter') {
        //     console.log('enter clicked');
        // }
        this.props.propsNavigation(event);
        // const response = await fetch(`http://localhost:8000/api/product/search`);
        // const products = await response.json();
        // this.setState({ products });
    }
}

export default NavigationBar;
