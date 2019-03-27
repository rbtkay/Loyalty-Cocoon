import React, { Component } from 'react';
import { Input, Menu, MenuItem, Dropdown, DropdownItem, Search, Form } from 'semantic-ui-react';
import indexPage from '../pages/user';
import { Router } from '../routes';
import loco from '../ethereum/loco';
import { throws } from 'assert';
import { Link } from '../routes';

class NavigationBar extends Component {
    state = {
        username: '',
        balance: 0,
        search: ''
    };

    render() {
        const categories = ['Electronics', 'Food', 'Clothing', 'Toys', 'Groceries'];
        const username = this.state.username;

        return (
            <Menu fixed="top" inverted color="violet">

                <MenuItem>
                    <Link href={`/user/`}>
                        <a>Loyalty Cocoon</a>
                    </Link>
                </MenuItem>

                <MenuItem  onClick={this.redirect}>
                    Purchases
                </MenuItem>

                <Dropdown text='Categories' pointing className='item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>{categories[0]}</Dropdown.Item>
                        <Dropdown.Item>{categories[1]}</Dropdown.Item>
                        <Dropdown.Item>{categories[2]}</Dropdown.Item>
                        <Dropdown.Item>{categories[3]}</Dropdown.Item>
                        <Dropdown.Item>{categories[4]}</Dropdown.Item>
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
            console.log(username);
            const balance = await loco.methods.balances(account).call();
            this.setState({ username, balance });
        }
    }

    redirect = () => {
        console.log('in the redirection ');
        console.log(this.state.username);
        const { username } = this.state;
        Router.pushRoute(`/user/purchases/${username}`);
    }

    handleSubmit = (e) => {
        console.log("form submitted with:");
        console.log(this.state.search);
        Router.pushRoute(`/user/search/${this.state.search}`);
    }

    logout = () =>{
        localStorage.clear();
        Router.pushRoute(`/`);
    }

    settings = () =>{
        Router.pushRoute(`/user/settings/${this.state.username}`);
    }

    search = async (event) => {
        this.props.propsNavigation(event);
    }
}

export default NavigationBar;
