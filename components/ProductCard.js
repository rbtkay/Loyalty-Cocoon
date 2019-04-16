import React, { Component } from 'react';
import { Card, Button, Modal, Image, Header } from 'semantic-ui-react';
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
                        <Card.Meta>{priceLoco}</Card.Meta>
                        <Card.Meta>{vendor}</Card.Meta>
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
                    <Modal.Content image>
                        <Image wrapped size='big' src='/static/default_product_image.jpg' />
                        <Modal.Description>
                            <b>Price </b>{priceLoco}
                            <br />
                            <br />
                            <b>Description </b>
                            <p>{description}</p>
                            <br />
                            <b>by </b>{vendor}
                            <br />
                            <Button
                                inverted
                                color="violet"
                                floated='right'
                                size='large'
                                style={{width: 300}}
                                onClick={this.confirmOpen}>Buy</Button>
                        </Modal.Description>
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