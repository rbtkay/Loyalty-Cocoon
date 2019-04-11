import React, { Component } from 'react';
import { Item, Button, Label, Modal, Header, Icon } from 'semantic-ui-react';
import Router from '../routes';

class Purchase extends Component {

    state = {
        isOpen: false
    }

    render() {
        const { purchaseId, productId, username, vendor, time, productName, type, isFinalized } = this.props;

        if (type === 'vendor') {
            console.log('isFinalized');
            console.log(isFinalized);
            return (
                <div>
                    <Item.Group divided>
                        <Item>
                            <Item.Image size='small' src='/static/default_product_image.jpg' />

                            <Item.Content>
                                <Item.Header>{productName}</Item.Header>
                                <Item.Meta>{productId}</Item.Meta>
                                <Item.Description>Bought By: {username}</Item.Description>

                                <Item.Extra>
                                    <Label>id: {purchaseId}</Label>
                                    {this.renderExtra(isFinalized, time, type)}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>

                    <Modal open={this.state.isOpen} basic size='small'>
                        <Header icon='Archive' content='Finalize Purchase?' />
                        <Modal.Content>
                            <p>You're about to Finalize a purchase</p>
                        </Modal.Content>
                        <Modal.Actions>
                            <Button basic color='red' inverted onClick={this.close}>
                                <Icon name='remove' /> No</Button>
                            <Button color='green' inverted onClick={this.finalize}>
                                <Icon name='checkmark' /> Yes</Button>
                        </Modal.Actions>
                    </Modal>
                </div>
            );
        } else {
            console.log(isFinalized)
            return (
                <div>
                    <Item.Group divided>
                        <Item>
                            <Item.Image size='small' src='/static/default_product_image.jpg' />

                            <Item.Content>
                                <Item.Header>{productName}</Item.Header>
                                <Item.Meta>{productId}</Item.Meta>
                                <Item.Description>Bought At: {vendor}</Item.Description>

                                <Item.Extra>
                                    {this.renderExtra(isFinalized, time, type)}
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </div>)
        }
    }


    renderExtra(finalized, time, type) {

        if (type === 'vendor') {
            if (finalized.data[0] === 0) {
                return (
                    <div>
                        <Label>on: {time}</Label>
                        <Button size='big' basic color='violet' floated='right' onClick={this.show}>Finalize</Button>
                    </div>
                )
            } else {
                const final = 'Finalized';
                return (
                    <div>
                        <Label>on: {time}</Label>
                        <Button size='big' color='green' floated='right'>{final}</Button>
                    </div>
                )
            }
        } else {
            if (finalized.data[0] === 0) {
                finalized = 'Pending';
                return (
                    <div>
                        <Label>on: {time}</Label>
                        <br />
                        <br />
                        <Label>{finalized}</Label>
                    </div>
                )
            } else {
                finalized = 'Finalized';
                return (
                    <div>
                        <Label>on: {time}</Label>
                        <br />
                        <br />
                        <Label color='green'>{finalized}</Label>
                    </div>
                )
            }
        }
    }

    show = () => {
        this.setState({ isOpen: true });
    }

    close = () => {
        this.setState({ isOpen: false });
    }

    finalize = async () => {
        const { purchaseId } = this.props;

        const response = await fetch(`/api/vendor/purchase/finalize?id=${purchaseId}`, {
            headers: new Headers({
                'authorization': localStorage.getItem('authorization')
            })
        });

        if (response.status === 200) {
            this.setState({ isOpen: false });
            this.props.finalize();
        }
    }
}

export default Purchase;