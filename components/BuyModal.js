import React, { Component } from 'react';
import { Modal, Icon, Button, Message, Form } from 'semantic-ui-react';
import loco from '../ethereum/loco';

class BuyModal extends Component {

    state = {
        loading: false
    };

    render() {
        if (!this.props.affordable) {
            return (
                <Modal
                    open={this.props.isConfirmOpen}
                    onClose={this.props.confirmClose}
                    size='tiny'
                    basic>
                    <Modal.Header>
                        <Icon name='times circle' /> Not enough LOCO
                    </Modal.Header>
                    <Modal.Content>
                        <h3>Sorry you do not own enough LOCO. (Shop at Loyalty Cocoon Vendors to earn more LOCO).</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            inverted
                            onClick={this.props.confirmClose}>
                            <Icon name='checkmark' /> Ok
                        </Button>
                    </Modal.Actions>
                </Modal>
            );
        } else {
            return (
                <Modal
                    open={this.props.isConfirmOpen}
                    onClose={this.props.confirmClose}
                    size='tiny'
                    dimmer='blurring'
                    closeOnEscape={false}
                    closeOnDimmerClick={false}>
                    <Modal.Header>
                        <Icon name='shopping cart' /> Confirm Purchase
                    </Modal.Header>
                    <Modal.Content>
                        <h3>Are you sure you want to purchase this product at {this.props.price} LOCO</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.props.confirmClose}>Cancel</Button>
                        <Button
                            loading={this.state.loading}
                            color='violet'
                            onClick={this.purchaseProduct}>
                            <Icon name='checkmark' /> Yes
                        </Button>
                    </Modal.Actions>

                    {this.renderMessage()}

                </Modal>
            );
        }
    }

    purchaseProduct = async (event) => {
        event.preventDefault();

        if (!this.state.loading) {
            this.setState({ loading: true });
            this.props.errorMessage('Your transaction is being processed...');
            try {
                const sender = localStorage.getItem('address');
                const response = await fetch(`http://localhost:8000/api/user/address?username=${this.props.vendor}`, {
                    headers: new Headers({
                        'authorization': localStorage.getItem('authorization')
                    })
                });
                const manager = await loco.methods.manager().call();

                const receiver = await response.json();

                await loco.methods.transferFrom(sender, this.props.price, receiver[0].vendor_address).send({
                    from: manager
                });

                // TODO: Add a fetch to store purchase in purchase_t

                this.props.handleSuccess();
                this.props.confirmClose();

            } catch (err) {
                this.props.errorMessage(err.message);
            }
            this.setState({ loading: false });
        }
    }

    renderMessage = () => {
        if (this.state.loading) {
            return (
                <Message header="Hold On" content={this.props.msg}></Message>
            );
        } else if (this.props.msg != '') {
            return (
                <Message error header="Oops!" content={this.props.msg}></Message>
            );
        }
    }
}

export default BuyModal;