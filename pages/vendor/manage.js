import React, { Component } from 'react';
import { Table, Button, Modal, Input, Message, Segment, Container, Grid, Image, TextArea, Dropdown, Divider } from 'semantic-ui-react';
import Layout from '../../components/Layout';
import { Router } from '../../routes';
import VendorNavBar from '../../components/VendorNavBar';

class Manage extends Component {
    state = {
        products: [],
        name: '',
        category: '',
        price: '',
        loco: '',
        description: '',
        isOpen: false
    };

    render() {
        const options = [
            {
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
                value: 'Groceries'
            },
        ]
        return (
            <div>
                <Layout />
                <VendorNavBar />
                <div>
                    <Segment>
                        <br />
                        <br />
                        <br />
                        <Grid columns={2}>
                            <Grid.Column width='7' verticalAlign='middle' textAlign='center' color='violet'>
                                <h1>Manage Your Products</h1>
                                <Table celled selectable >
                                    <Table.Header>
                                        <Table.Row>
                                            <Table.HeaderCell>ID</Table.HeaderCell>
                                            <Table.HeaderCell>Name</Table.HeaderCell>
                                            <Table.HeaderCell>Category</Table.HeaderCell>
                                            <Table.HeaderCell>Price</Table.HeaderCell>
                                            <Table.HeaderCell>Offered?</Table.HeaderCell>
                                            <Table.HeaderCell>Image (link?)</Table.HeaderCell>
                                        </Table.Row>
                                    </Table.Header>

                                    <Table.Body>
                                        {this.renderRow()}
                                    </Table.Body>
                                </Table>
                                <Button negative floated='left'>Remove Items</Button>
                                <Button
                                    positive
                                    floated='right'
                                    onClick={this.show}>Add New Item</Button>
                            </Grid.Column>
                        </Grid>
                    </Segment>
                </div>

                <Modal open={this.state.isOpen} onClose={this.close} size='tiny' style={{color: 'red'}}>
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
                            style={{width: '100%', height: '100%' }}
                            value={this.state.description}
                            onChange={event => this.setState({ description: event.target.value })}
                        />
                    </Modal.Content>
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

    renderRow() {
        if (this.state.products) {
            return this.state.products.map((object) => {
                console.log();
                return (
                    <Table.Row key={object['product_id']}>
                        <Table.Cell>{object['product_id']}</Table.Cell>
                        <Table.Cell>{object['product_name']}</Table.Cell>
                        <Table.Cell>{object['product_category']}</Table.Cell>
                        <Table.Cell>{object['product_price']}</Table.Cell>
                        <Table.Cell>{object['product_offered'].data[0]}</Table.Cell>
                    </Table.Row>
                );
            });
        }
    }

    async componentDidMount() {
        const username = localStorage.getItem('username');
        const response = await fetch(`http://localhost:8000/api/product/vendor?username=${username}`, {
            headers: new Headers({
                'authorization':
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOlt7InVzZXJfdXNlcm5hbWUiOiJrYm9nIiwidXNlcl9lbWFpbCI6ImtldmluLmJvZ2hvc3NpYW5AZ21haWwuY29tIiwidXNlcl9wYXNzd29yZCI6ImE2NjVhNDU5MjA0MjJmOWQ0MTdlNDg2N2VmZGM0ZmI4YTA0YTFmM2ZmZjFmYTA3ZTk5OGU4NmY3ZjdhMjdhZTMiLCJ1c2VyX25hbWUiOiJLZXZpbiBCb2dob3NzaWFuIiwidXNlcl9kb2IiOiIxOTkzLTA5LTI4VDIyOjAwOjAwLjAwMFoiLCJ1c2VyX2dlbmRlciI6Ik0iLCJ1c2VyX3Bob25lIjoiNzAtMTQwMjk2IiwidXNlcl9wcmVmcyI6IlwiU3R1ZHllblwiIDopIiwidXNlcl9hZGRyZXNzIjoiMHg0ZkM5MUIxZDc5MDFFMjk4MWRDN0U2MjQ4NjdkYzg1ODE1RUZGN2IzIiwidXNlcl9jb3VudHJ5IjoiTGViYW5vbiIsInVzZXJfcHJvZmVzc2lvbiI6IlN0dWRlbnQiLCJ1c2VyX29yZ2FuaXphdGlvbiI6IkxPQ08ifV0sImlhdCI6MTU1MzA5NzMzOX0.f7H4aA5RKz5BlLO5_G4a-95xP4XQ9IESQJuQx58A4rs'
            })
        });

        const products = await response.json();
        this.setState({ products });
    }
}

export default Manage;
