import React, { Component } from 'react';
import { Card, Button } from 'semantic-ui-react';
import Layout from './Layout';

class ProductCard extends Component {

    render() {
        const { name, description, price } = this.props;

        return (
            <Card>
                <Card.Content>
                    <Card.Header>{name}</Card.Header>
                    <Card.Meta>{price}</Card.Meta>
                    <Card.Description>{description}</Card.Description>
                </Card.Content>
                <Card.Content extra>
                    <div className='ui two buttons'>
                        <Button basic color="green">Buy</Button>
                    </div>
                </Card.Content>
            </Card>
        );
    }
}

export default ProductCard;