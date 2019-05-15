import React, { Component } from 'react';
import { Form, Table, Button, Modal, Input, Message, Segment, Container, Grid, Image, TextArea, Dropdown, Divider, Icon, Label } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import VendorNavBar from '../../components/VendorNavBar';
import ManageTable from '../../components/ManageTable';
import { sha256 } from 'js-sha256';
let cookie = require('../../cookie');
import Footer from '../../components/Footer';

class Manage extends Component {
    state = {
        products: [],
        offered: [],
        name: '',
        category: '',
        price: '',
        loco: '',
        description: '',
        isOpen: false,
        isConfirmOpen: false,
        username: '',
        auth: '',
        active: [],
        activeOffered: [],
        isVendorVerified: false,
        isVerifyLoading: false,
        verification: { msg: '' },
        verificationPassword: '',
        verificationUser: '',
        isFormValid: true
    };

    render() {
        const options = [{
                key: 'Clothing',
                text: 'Clothing',
                value: 'Clothing'
            },
            {
                key: 'Electronics',
                text: 'Electronics',
                value: 'Electronics'
            },
            {
                key: 'Food',
                text: 'Food',
                value: 'Food'
            },
            {
                key: 'Groceries',
                text: 'Groceries',
                value: 'Groceries'
            },
            {
                key: 'Toys',
                text: 'Toys',
                value: 'Toys'
            }
        ]

        if (this.state.isVendorVerified) {
            return (
                <div>
                    <Layout />
                    <VendorNavBar />
                    <div>
                        <Segment color='violet' inverted>

                            <br /><br /><br />

                            <Grid columns={2}>
                                <Grid.Column width='7' verticalAlign='top' textAlign='center'>
                                    <h1>Manage Your Products</h1>

                                    <Segment style={{ overflow: 'auto', maxHeight: '500px' }}>
                                        <ManageTable products={this.state.products} offered={false} handleActive={this.onRowClick} active={this.state.active} />
                                    </Segment>

                                    <Button
                                        negative
                                        onClick={this.showConfirm}
                                        floated='left'>Remove Selected Items</Button>
                                    <Button
                                        positive
                                        floated='right'
                                        onClick={this.show}>Add New Item</Button>
                                </Grid.Column>

                                <Grid.Column width='2' verticalAlign='middle' textAlign='center'>
                                    <Button
                                        as='a'
                                        circular
                                        inverted
                                        icon='angle double right'
                                        size='massive'
                                        fluid
                                        onClick={this.addOffers}></Button>

                                    <br /><br />

                                    <Button
                                        as='a'
                                        circular
                                        inverted
                                        icon='angle double left'
                                        size='massive'
                                        fluid
                                        onClick={this.removeOffers}></Button>
                                </Grid.Column>

                                <Grid.Column width='7' verticalAlign='top' textAlign='center'>
                                    <h1>Products Offered</h1>

                                    <Segment style={{ overflow: 'auto', maxHeight: '500px' }}>
                                        <ManageTable products={this.state.offered} offered={true} handleActive={this.onOfferedRowClick} active={this.state.activeOffered} />
                                    </Segment>

                                </Grid.Column>
                            </Grid>

                            <br /><br /><br />

                        </Segment>
                    </div>

                    <Modal open={this.state.isOpen} onClose={this.close} size='tiny'>
                        <Modal.Header>Add a new item</Modal.Header>
                        <Modal.Content>
                            <Grid columns={2} rows={2} textAlign='center' verticalAlign='middle'>
                                <Grid.Row>
                                    <Grid.Column>
                                        <Input
                                            name='name'
                                            placeholder='Product Name'
                                            value={this.state.name}
                                            onChange={event => this.setState({ name: event.target.value })}
                                        />
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Input
                                            icon='dollar sign'
                                            name='price'
                                            placeholder='Price'
                                            value={this.state.price}
                                            onChange={event => this.setState({ price: event.target.value })}
                                        />
                                    </Grid.Column>
                                </Grid.Row>

                                <Grid.Row>
                                    <Grid.Column>
                                        <Dropdown
                                            name='category'
                                            value={this.state.category}
                                            selection
                                            options={options}
                                            placeholder='Category'
                                            onChange={(event, data) => this.setState({ category: data.value })}
                                        />
                                    </Grid.Column>

                                    <Grid.Column>
                                        <Input
                                            name='loco'
                                            labelPosition='right'
                                            label='LOCO'
                                            value={this.state.loco}
                                            placeholder='Price in LOCO'
                                            onChange={event => this.setState({ loco: event.target.value })}
                                        />
                                    </Grid.Column>
                                </Grid.Row>
                            </Grid>

                            <Divider />

                            <TextArea
                                name='description'
                                placeholder='Item Description'
                                style={{ width: '100%', height: '100%' }}
                                value={this.state.description}
                                onChange={event => this.setState({ description: event.target.value })}
                            />

                            <Button
                                color='violet'
                                onClick={this.addItem}>Add Item</Button>
                        </Modal.Content>
                    </Modal>

                    <Modal open={this.state.isConfirmOpen} onClose={this.confirmClose} size='tiny' basic>
                        <Modal.Header>
                            <Icon name='times circle' /> Confirm Removal
                    </Modal.Header>
                        <Modal.Content>
                            <h3>Are you sure you want to permanently remove the selected items?</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button onClick={this.confirmClose} inverted>No</Button>
                            <Button color='red' onClick={this.removeItems} inverted>
                                <Icon name='checkmark' /> Yes
                        </Button>
                        </Modal.Actions>
                    </Modal>
                    <Footer />
                </div>
            );
        } else {
            return (
                <div>
                    <Layout />
                    <VendorNavBar />
                    <br /><br /><br />
                    <Segment inverted color='violet'>
                        <br />
                        <Container>
                            <Segment color='violet' inverted>
                                {/* <Segment> */}
                                <Grid columns={3}>
                                    <Grid.Column width='4'>
                                    </Grid.Column>
                                    <Grid.Column width='8'>
                                        <Segment color='violet' inverted>
                                            <Segment className='header' color='violet' inverted textAlign='center'><h1>Login to Continue...</h1></Segment>
                                            <Divider />
                                            <Segment >
                                                <Form error={!this.state.isFormValid}>
                                                    <Form.Field>
                                                        <label floated='right'>Username</label>
                                                        <Input
                                                            fluid
                                                            error
                                                            name="verificationUser"
                                                            placeholder="Username"
                                                            value={this.state.verificationUser}
                                                            onChange={event => {
                                                                this.setState({ verificationUser: event.target.value })
                                                            }}
                                                        />
                                                    </Form.Field>
                                                    <Form.Field>
                                                        <label>Password</label>
                                                        <Input
                                                            type="password"
                                                            fluid
                                                            name="verificationPassword"
                                                            placeholder="Password"
                                                            value={this.state.verificationPassword}
                                                            onChange={event => this.setState({ verificationPassword: event.target.value })}
                                                        />
                                                    </Form.Field>
                                                    <Message error header='Oops!' content={this.state.verification['msg']} ></Message>
                                                    <Button negative floated='right' loading={this.state.isVerifyLoading} onClick={this.verifyVendor}>Verify</Button><br /><br /><br /><br /><br />
                                                </Form>
                                            </Segment>
                                        </Segment>
                                    </Grid.Column>
                                    <Grid.Column width='4'>
                                    </Grid.Column>
                                </Grid>
                            </Segment>
                        </Container>
                    </Segment>
                    <Footer />
                </div>
            );

        }
    }

    async componentDidMount() {
        const username = cookie.getCookie('username');
        const response = await fetch(`/api/vendor/product/vendor?username=${username}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });

        const products = await response.json();
        const offered = [];
        products.map((product) => {
            if (product.product_isOffered.data[0] == 1) {
                offered.push(product);
            }
        })
        this.setState({ products, username, offered });
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    showConfirm = () => {
        this.setState({ isConfirmOpen: true });
    }

    closeConfirm = () => {
        this.setState({ isConfirmOpen: false });
    }

    addItem = async () => {
        const { username, name, category, price, loco, description, products } = this.state;
        const response = await fetch(`/api/vendor/product/add?name=${name}&category=${category}&price=${price}&loco=${loco}&description=${description}&username=${username}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });
        const result = await response.json();
        if (result.affectedRows > 0) {
            this.setState({ isOpen: false });
            this.componentDidMount();
        }
    }

    removeItems = async () => {
        const { active, products } = this.state;
        const temp = active.map((index) => {
            return parseInt(products[index]['product_id']);
        });

        const id = temp.join(',');
        const response = await fetch(`/api/vendor/product/delete?id=${id}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });
        this.setState({ active: [], isConfirmOpen: false });
        this.componentDidMount();
    }

    addOffers = async (event) => {
        event.target.blur();
        const { active, products } = this.state;
        const temp = active.map((index) => {
            return parseInt(products[index]['product_id']);
        });

        const id = temp.join(',');
        const response = await fetch(`/api/vendor/product/addOffer?id=${id}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });
        this.setState({ active: [] });
        this.componentDidMount();
    }

    removeOffers = async (event) => {
        event.target.blur();
        const { activeOffered, offered } = this.state;
        const temp = activeOffered.map((index) => {
            return parseInt(offered[index]['product_id']);
        });

        const id = temp.join(',');
        const response = await fetch(`/api/vendor/product/removeOffer?id=${id}`, {
            headers: new Headers({
                'authorization': cookie.getCookie('authorization')
            })
        });
        this.setState({ activeOffered: [] });
        this.componentDidMount();
    }

    onRowClick = (event, product, index) => {
        const selectedRowIndex = event.target.parentNode.getAttribute('data-item');
        const { active } = this.state;

        if (!active.includes(selectedRowIndex)) {
            active.push(selectedRowIndex);
        } else {
            for (var i = 0; i < active.length; i++) {
                if (active[i] === selectedRowIndex) {
                    active.splice(i, 1);
                }
            }
        }
        this.setState({ active });
    }

    onOfferedRowClick = (event, product, index) => {
        const selectedRowIndex = event.target.parentNode.getAttribute('data-item');
        const { activeOffered } = this.state;

        if (!activeOffered.includes(selectedRowIndex)) {
            activeOffered.push(selectedRowIndex);
        } else {
            for (var i = 0; i < activeOffered.length; i++) {
                if (activeOffered[i] === selectedRowIndex) {
                    activeOffered.splice(i, 1);
                }
            }
        }
        this.setState({ activeOffered });
    }

    verifyVendor = async () => {
        const { verificationUser, verificationPassword } = this.state;
        this.setState({ verification: { msg: '' }, isVerifyLoading: true });

        if (verificationUser !== '' && verificationPassword !== '') {
            if (verificationUser.toLowerCase() === cookie.getCookie('username').toLowerCase()) {

                const hashedPassword = sha256(verificationPassword);
                try {
                    const response = await fetch(`/api/auth/login?username=${verificationUser}&password=${hashedPassword}`);
                    const res = await response.json();

                    const username = res['result'][0].user_username;

                    if (response.status === 200) {
                        this.setState({ isVendorVerified: true });
                    } else {
                        this.setState({ verification: { msg: 'Invalid Username/Password' }, isFormValid: false, isVerifyLoading: false });
                    }
                } catch (err) {
                    this.setState({ verification: { msg: 'Oops, Something went wrong...' }, isFormValid: false, isVerifyLoading: false });
                }
            } else {
                this.setState({ verification: { msg: 'Invalid Username/Password' }, isFormValid: false, isVerifyLoading: false });
            }
        } else {
            this.setState({ verification: { msg: 'Fields Required' }, isFormValid: false, isVerifyLoading: false });
        }
    }
}

export default Manage;