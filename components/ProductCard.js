import React, { Component } from 'react';
import { Card, Button, Modal, Image, Header } from 'semantic-ui-react';
import Layout from './Layout';
// import image from '../static/default_product_image.jpg';

class ProductCard extends Component {

    state = { isOpen: false };

    show = () => {
        this.setState({ isOpen: true });
    }

    close = () => {
        this.setState({ isOpen: false });
    }


    render() {
        const { name, description, priceLoco, category, vendor } = this.props;

        return (
            <div>
                <Card color="violet">
                    <Card.Content onClick={this.show}>
                        <Card.Header>{name}</Card.Header>
                        <Card.Meta>{priceLoco}</Card.Meta>
                        <Card.Description>{vendor}</Card.Description>
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
                        <Image wrapped size='medium' src='../static/default_product_image.jpg' />
                        <Modal.Description>
                            <b>Price </b>{priceLoco}
                            <br />
                            <br />
                            <b>Description </b>
                            <p>{description}</p>
                            <br />
                            <b>by </b>{vendor}

                        </Modal.Description>
                    </Modal.Content>
                </Modal>
            </div>
        );
    }
}

export default ProductCard;
