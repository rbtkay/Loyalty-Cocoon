import React, { Component } from 'react';
import { Card, Button, Modal, Image } from 'semantic-ui-react';
import Layout from './Layout';

class ProductCard extends Component {

    state = { isOpen: false };
    
    show = () => {
        this.setState({ isOpen: true });
    }

    close = () => {
        this.setState({ isOpen: false });
    }


    render() {
        const { name, description, price, category } = this.props;

        return (
            <div>
                <Card>
                    <Card.Content onClick={this.show}>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{price}</Card.Meta>
                        <Card.Description>{description}</Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <div className='ui two buttons'>
                            <Button inverted color="violet" >Buy</Button>
                        </div>
                    </Card.Content>
                </Card>


                <Modal open={this.state.isOpen} onClose={this.close}>
                    <Modal.Header>{name}</Modal.Header>
                    <Modal.Content image>
                        <Image wrapped size='medium' src='' />
                        <Modal.Description>{description}</Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default ProductCard;
