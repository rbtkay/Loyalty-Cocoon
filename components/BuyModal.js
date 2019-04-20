import React, { Component } from 'react';
import { Modal, Icon, Button, Message, Form } from 'semantic-ui-react';
import loco from '../ethereum/loco';
import { sha256 } from 'js-sha256';
import NavigationBar from './NavigationBar';
let cookie = require('../cookie');

class BuyModal extends Component {

    state = {
        loading: false
    };

    render() {
        if (cookie.getCookie('isVerified') == sha256('1')) {
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
                            <h3>Are you sure you want to purchase this product from {this.props.vendorUsername} at {this.props.price} LOCO</h3>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button
                                onClick={!this.state.loading ? this.props.confirmClose : null}>Cancel</Button>
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
        } else {
            return (
                <Modal
                    open={this.props.isConfirmOpen}
                    onClose={this.props.confirmClose}
                    size='tiny'
                    dimmer='blurring'>
                    <Modal.Header>
                        <Icon name='times circle' /> Verify Account
                </Modal.Header>
                    <Modal.Content>
                        <h3>Please verify your account in order to make purchases.</h3>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            onClick={this.props.confirmClose}>
                            <Icon name='checkmark' /> OK
                    </Button>
                    </Modal.Actions>
                </Modal>
            );
        }
    }

    purchaseProduct = async (event) => {
        event.preventDefault();

        const { username, vendorUsername, productId } = this.props;
        const d = new Date();

        const day = d.getDate().toString();
        const month = (d.getMonth() + 1).toString();
        const year = d.getFullYear().toString();

        const hour = d.getHours().toString();
        const minute = d.getSeconds().toString();
        const second = d.getMinutes().toString();

        const date = year + '-' + month + '-' + day;
        const time = hour + ':' + minute + ':' + second;

        const DateTime = date + ' ' + time;

        if (!this.state.loading) {
            this.setState({ loading: true });
            this.props.errorMessage('Your transaction is being processed...');
            try {
                const sender = cookie.getCookie('address');
                const response = await fetch(`/api/user/address?username=${this.props.vendor}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });

                const receiver = await response.json();
                console.log(receiver[0].user_ethAddress);
                console.log('price', this.props.price);

                const res = await fetch(`/api/contract/transfer?address=${sender}&amount=${this.props.price}&toAddress=${receiver[0].user_ethAddress}`);

                const result = await res.json();
                console.log(result.transactionHash);

                const insertPurchase = await fetch(`/api/user/purchase/add?username=${username}&productId=${productId}&vendorUsername=${vendorUsername}&purchaseTime=${DateTime}`, {
                    headers: new Headers({
                        'authorization': cookie.getCookie('authorization')
                    })
                });

                const send = await fetch(`/api/lib/receipt?username=${username}&vendorUsername=${vendorUsername}&productId=${this.props.productId}&txHash=${result.transactionHash}`);

                let balance = cookie.getCookie('balance');
                balance -= this.props.price;

                cookie.setCookie('balance', balance, 100);
                this.props.handleSuccess();
                this.props.confirmClose();

            } catch (err) {
                this.props.errorMessage(err.message);
            }
            NavigationBar.refreshNavBar(this.props.price);
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