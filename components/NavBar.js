import React, { Component } from 'react';
import { Menu, Image } from 'semantic-ui-react';
import { Link } from '../routes';
// import { viewSession } from '../Session';

class NavBar extends Component {
    render() {
        return (
            <Menu fixed="top" inverted color="violet">

                <Menu.Item>
                    <Link href={`/`}>
                        <a><Image circular src='/static/Logo.gif' centered size='mini' /></a>
                    </Link>
                </Menu.Item>
            </Menu>)
    }
}

export default NavBar;