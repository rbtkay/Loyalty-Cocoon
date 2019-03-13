import React, { Component } from 'react';
import { Input, Menu, MenuItem, Dropdown, DropdownItem } from 'semantic-ui-react';
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
                        <Input icon='search' placeholder='Search...' />
                    </MenuItem>

                    <MenuItem name='Logout' />

                </Menu.Menu>
            </Menu>
        );
    }
}

export default NavigationBar;