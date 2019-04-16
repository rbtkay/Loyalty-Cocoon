import React, { Component } from 'react';
import { Card, Button, Modal, Image, Header, Label, Grid } from 'semantic-ui-react';
import Layout from './Layout';
import BuyModal from './BuyModal';
let cookie = require('../cookie');

class ProductCard extends Component {

    state = {
        isOpen: false,
        isConfirmOpen: false,
        errorMessage: ''
    };

    render() {
        const { name, description, priceLoco, category, vendor, id } = this.props;

        return (
            <div>
                <Card color="violet">
                    <Card.Content onClick={this.show}>
                        <Image floated='left' size='tiny' src='/static/default_product_image.jpg' />
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{vendor}</Card.Meta>
                        <Card.Meta textAlign='right'><Label tag >{priceLoco}</Label></Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button
                                inverted
                                color="violet"
                                onClick={this.confirmOpen}>Buy</Button>
                        </div>
                    </Card.Content>
                </Card>

                {this.appendBuyModal()}

                <Modal open={this.state.isOpen} onClose={this.close}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Content>
                        <Grid>
                            <Grid.Row columns={2}>
                                <Grid.Column>
                                    <Image wrapped size='big' src='/static/default_product_image.jpg' />
                                </Grid.Column>
                                <Grid.Column>
                                    <Modal.Description>
                                        <b>Sold by: </b>{vendor}
                                        <br /> <br />
                                        <b>Description </b>
                                        <p>{description}</p>
                                        <br />
                                        <Label tag>{priceLoco}</Label>
                                        <br /> <br />
                                        <Button
                                            inverted
                                            color='violet'
                                            fluid
                                            size='large'
                                            onClick={this.confirmOpen}>Buy</Button>
                                    </Modal.Description>
                                </Grid.Column>
                            </Grid.Row>
                        </Grid>
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

    confirmOpen = () => {
        this.setState({ isConfirmOpen: true });
        this.handleMessage('');
    }

    confirmClose = () => {
        this.setState({ isConfirmOpen: false });
    }

    appendBuyModal = () => {
        const balance = cookie.getCookie('balance');

        const { priceLoco } = this.props;
        const temp = priceLoco.split(' ');
        let val = parseInt(temp[0]);

        if (balance > val) {

            const username = cookie.getCookie('username');
            const vendorUsername = this.props.vendor;
            const productId = this.props.id;

            return <BuyModal
                username={username}
                vendorUsername={vendorUsername}
                productId={productId}
                handleSuccess={this.props.handleSuccess}
                msg={this.state.errorMessage}
                errorMessage={this.handleMessage}
                affordable={true}
                price={val}
                isConfirmOpen={this.state.isConfirmOpen}
                confirmClose={this.confirmClose}
                vendor={this.props.vendor}
            />;
        } else {
            return <BuyModal
                handleSuccess={this.props.handleSuccess}
                affordable={false}
                price={val}
                isConfirmOpen={this.state.isConfirmOpen}
                confirmClose={this.confirmClose}
                vendor={this.props.vendor}
            />;
        }
    }

    handleMessage = (msg) => {
        this.setState({ errorMessage: msg });
    }
}

export default ProductCard;