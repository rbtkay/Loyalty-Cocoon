import React, { Component } from 'react';
import { Input, Menu, MenuItem, Dropdown, DropdownItem, Search, Form, Button, Image } from 'semantic-ui-react';
import indexPage from '../pages/user';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { throws } from 'assert';
import { Link } from '../routes';

class NavigationBar extends Component {
    state = {
        categories: ['Electronics', 'Food', 'Clothing', 'Toys', 'Groceries'],
        username: '',
        balance: 0,
        search: ''
    };

    render() {
        const { categories } = this.state;

        return (
            <Menu fixed="top" inverted color="violet">

                <MenuItem>
                    <Link href={`/user/`}>
                        <a><Image circular src='/static/Logo.gif' centered size='mini' /></a>
                    </Link>
                </MenuItem>

                <MenuItem onClick={this.redirect}>
                    Purchases
                </MenuItem>

                <Dropdown text='Categories' pointing className='item'>
                    <Dropdown.Menu>
                        <Dropdown.Item text={categories[0]} onClick={(event, data) => this.goCategory(data.text)}></Dropdown.Item>
                        <Dropdown.Item text={categories[1]} onClick={(event, data) => this.goCategory(data.text)}></Dropdown.Item>
                        <Dropdown.Item text={categories[2]} onClick={(event, data) => this.goCategory(data.text)}></Dropdown.Item>
                        <Dropdown.Item text={categories[3]} onClick={(event, data) => this.goCategory(data.text)}></Dropdown.Item>
                        <Dropdown.Item text={categories[4]} onClick={(event, data) => this.goCategory(data.text)}></Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Menu position='right'>

                    <MenuItem position='left' >
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Input
                                name='name'
                                style={{ width: '400px' }}
                                value={this.state.search}
                                onChange={event => this.setState({ search: event.target.value })}
                                icon='search'
                                placeholder='Search...'
                            />
                        </Form>
                    </MenuItem>
                    <Dropdown text={`Welcome, ${this.state.username}`} className='item' pointing >
                        <Dropdown.Menu>
                            <Dropdown.Header style={{ textAlign: "right" }}>{this.state.balance} LOCO</Dropdown.Header>
                            <Dropdown.Item onClick={this.settings}>Settings</Dropdown.Item>
                            <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </Menu.Menu>
            </Menu>
        );
    }

    async componentDidMount() {
        const auth = localStorage.getItem('authorization');
        if (auth === null) {
            Router.pushRoute("/");
        } else {
            const account = localStorage.getItem('address');
            const username = localStorage.getItem('username');
            try {
                const balance = await loco.methods.balances(account).call();
                this.setState({ username, balance });
            } catch (e) {
                const balance = 'NaN';
                this.setState({ username, balance });
            }
            console.log(username);
        }
    }

    goCategory = (data) => {
        Router.pushRoute(`/user/categories/${data}`);
    }

    redirect = () => {
        const { username } = this.state;
        Router.pushRoute(`/user/purchases/${username}`);
    }

    handleSubmit = (e) => {
        Router.pushRoute(`/user/search/${this.state.search}`);
    }

    logout = () => {
        localStorage.clear();
        Router.pushRoute(`/`);
    }

    settings = () => {
        Router.pushRoute(`/user/settings/${this.state.username}`);
    }

    search = async (event) => {
        this.props.propsNavigation(event);
    }
}

export default NavigationBar;