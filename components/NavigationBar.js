import React, { Component } from 'react';
import { Input, Menu, MenuItem, Dropdown, DropdownItem, Search, Form } from 'semantic-ui-react';
import indexPage from '../pages/index';

class NavigationBar extends Component {
    render() {
        const categories = ['Electronics', 'Food', 'Clothing', 'Toys', 'Groceries'];
        return (
            <Menu>
                <MenuItem name='Loyalty Cocoon' />

                <MenuItem name='Purchases' />

                <Dropdown text='Categories' pointing className='link item'>
                    <Dropdown.Menu>
                        <Dropdown.Item>{categories[0]}</Dropdown.Item>
                        <Dropdown.Item>{categories[1]}</Dropdown.Item>
                        <Dropdown.Item>{categories[2]}</Dropdown.Item>
                        <Dropdown.Item>{categories[3]}</Dropdown.Item>
                        <Dropdown.Item>{categories[4]}</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>

                <Menu.Menu position="right">

                    <MenuItem>
                        <Form>
                            <Form.Input
                                icon='search'
                                placeholder='Search...'
                                onChange={event => this.search(event.target.value)}
                            />
                        </Form>
                    </MenuItem>

                    <MenuItem name='Logout' />

                </Menu.Menu>
            </Menu>
        );
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