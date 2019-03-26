import React, { Component } from 'react';
import { Item, Button, Label } from 'semantic-ui-react';

class Purchase extends Component {

    render() {
        const { purchaseId, productId, username, vendor, time, productName } = this.props;
        return (
            <div>
                <h1>These are Your Purchases</h1>
                <Item.Group divided>
                    <Item>
                        <Item.Image size='small' src='../static/default_product_image.jpg' />

                        <Item.Content>
                            <Item.Header>{productName}</Item.Header>
                            <Item.Meta>{productId}</Item.Meta>
                            <Item.Description>Bought By: {username}</Item.Description>

                            <Item.Extra>
                                <Label>id: {purchaseId}</Label>
                                <Label>on: {time}</Label>
                                <Button className='success' floated='right'>Finalize</Button>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </div>
        );
    }
}

export default Purchase;