import React, { Component } from 'react';
import { Input, Menu, MenuItem } from 'semantic-ui-react';

class NavigationBar extends Component {
    render() {
        return (
            <Menu>
                <MenuItem className="" name='Loyalty Cocoon' />
                <MenuItem name='Purchases' />
                <MenuItem name='Special Offers' />

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