import React, { Component } from 'react';
import { Segment, Grid, List, Container } from 'semantic-ui-react';

class Footer extends Component {

    render() {
        return (
            <Segment inverted color='violet' style={{ padding: '5em 0em' }}>
                <Container>
                    <Grid divided stackable>
                        <Grid.Row>
                            <Grid.Column width={3}>
                                <h4>About</h4>
                                <List link inverted>
                                    <List.Item as='a' href='/about'>About Us</List.Item>
                                    <List.Item as='a' href='/contact'>Contact Us</List.Item>
                                    <List.Item as='a' href='/faq'>FAQ</List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={3}>
                                <h4>Services</h4>
                                <List link inverted>
                                    <List.Item as='a' href='/pricing'>Pricing</List.Item>
                                    <List.Item as='a' href='/contract'>Smart Contract</List.Item>
                                    <List.Item as='a' href='/terms'>Terms</List.Item>
                                    <List.Item as='a' href='/privacy'>Privacy Policy</List.Item>
                                </List>
                            </Grid.Column>

                            <Grid.Column width={7}>
                                <h4>Happy Shopping!</h4>
                                <p>Loyalty Cocoon wishes nothing but the best and safest browsing and shopping experiences</p>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Container>
            </Segment>
        );
    }
}

export default Footer;