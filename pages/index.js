import React, { Component } from 'react';
import { Form, Button, Message, Input, Container, Divider, Segment, Grid, Table, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import { Router } from '../routes';
import { sha256 } from 'js-sha256';
import { Link } from '../routes';
import loco from '../ethereum/loco';
import fetch from 'isomorphic-fetch';
let cookie = require('../cookie');


class SignIn extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        errorMessage: '',
        data: {},
        needConfirm: false
    };

    static async getInitialProps({ req }) {

        try {
            const confirmation = req.path;
            const token = confirmation.slice(6);

            const jwt = require('jsonwebtoken');
            const decodedToken = jwt.decode(token);
            const username = decodedToken.username;

            console.log(username);

            const response = await fetch(`/api/lib/verify?username=${username}`);

            console.log(decodedToken.username);
        } catch (e) {
            //     throw e;
        }
        return {};
    }

    render() {
        return (
            <div  >
                <Layout />
                <div >
                    <Segment color='violet' inverted>
                        <br />
                        <br />
                        <br />
                        <Grid columns={2}>
                            <Grid.Column width='10' verticalAlign='middle' textAlign='center' >
                                <Image circular rounded src='../static/Logo.gif' centered size='small' />
                                <h1>Loyalty Cocoon</h1>
                            </Grid.Column>
                            <Grid.Column width='4' textAlign='center'>

                                <br />
                                <br />

                                <Form error={!!this.state.errorMessage}>
                                    <h1>Sign In</h1>
                                    <br />
                                    <Form.Field >
                                        <Input
                                            placeholder="Username"
                                            name="username"
                                            value={this.state.username}
                                            onChange={event => this.setState({ username: event.target.value })}
                                        />
                                    </Form.Field>
                                    <br />
                                    <Form.Field>
                                        <Input
                                            type='password'
                                            placeholder="Password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={event => this.setState({ password: event.target.value })}
                                        />
                                    </Form.Field>
                                    <Message error header="Oops!" content={this.state.errorMessage}></Message>
                                    <Message warning visible={this.state.needConfirm}><h5>Verify your Email</h5><p>if you did not receive a confirmation email, click <a onClick={this.sendEmail}>here</a></p></Message>
                                    <br />
                                    <Button color="green" onClick={this.onSubmit} loading={this.state.loading}>Sign In!</Button>
                                    <br />
                                    <br />
                                </Form>
                                <Link href='/resetPassword'><a>Forgot Password ?</a></Link>
                            </Grid.Column>
                            <Grid.Column width='2'></Grid.Column>

                        </Grid>
                        <br />
                        <br />
                        <br />
                    </Segment>

                    <Segment>
                        <Grid columns={2} >
                            <Grid.Column verticalAlign='middle' textAlign='center'>
                                <h3>
                                    Join Us
                                </h3>
                                <br />
                                <Container textAlign='center' text>
                                    Too cultivated use solicitude frequently.
                                    Dashwood likewise up consider continue entrance
                                    ladyship oh. Wrong guest given purse power is
                                    no. Friendship to connection an am considered
                                    difficulty. Country met pursuit lasting moments
                                    why calling certain the. Middletons boisterous
                                    our way understood law. Among state cease how
                                    and sight since shall. Material did pleasure
                                    breeding our humanity she contempt had. So
                                    ye really mutual no cousin piqued summer result.
                                </Container>
                                <br />
                                <br />
                                <Link href='/user/signup'>
                                    <Button size="big" color='violet'>Sign Up</Button>
                                </Link>
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                <Image src='/static/default_product_image.jpg' centered rounded size='large' />
                            </Grid.Column>
                        </Grid>

                    </Segment>

                    <Segment inverted color='violet'>
                        <Grid columns={2} >
                            <Grid.Column>
                                <Image src='/static/default_product_image.jpg' centered rounded size='large' />
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                <h3>
                                    Become a Vendor
                                </h3>
                                <Container textAlign='center' text>
                                    Too cultivated use solicitude frequently. Dashwood likewise up consider
                                    continue entrance ladyship oh. Wrong guest given purse power is no. Friendship
                                    to connection an am considered difficulty. Country met pursuit lasting moments
                                    why calling certain the. Middletons boisterous our way understood law. Among
                                    state cease how and sight since shall. Material did pleasure breeding our
                                    humanity she contempt had. So ye really mutual no cousin piqued summer result.
                                </Container>
                                <br />
                                <br />
                                <Link href='/vendor/signup'>
                                    <Button color='green' size="big">Sign Up</Button>
                                </Link>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </div>
            </div>
        );
    }

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: '' });

        console.log(this.state.errorMessage);

        const { username, password } = this.state;
        if (username === '' || password === '') {
            this.setState({
                errorMessage: 'Some Field are Missing!',
                loading: false
            });
        } else {
            const hashedPassword = sha256(password);
            try {
                let response = await fetch(`/api/auth/login?username=${username}&password=${hashedPassword}`);

                if (response.status === 200) {
                    const data = await response.json();
                    this.setCookies(data);
                    const address = cookie.getCookie('address');
                    let balance = 0;
                    console.log(address);
                    try {
                        balance = await loco.methods.balances(address).call();
                    } catch (e) {
                        throw e;
                    } finally {
                        cookie.setCookie('balance', balance, 100);
                        const isVendor = data['result'][0]['user_isVendor'].data[0];
                        if (isVendor == 1) {
                            Router.pushRoute("/vendor/");
                        } else {
                            Router.pushRoute("/user/");
                        }
                    }
                } else if (response.status === 403) {
                    this.setState({ errorMessage: '', loading: false, needConfirm: true });
                } else if (response.status === 401) {
                    const errorMessage = 'Invalid Username/Password';
                    this.setState({ errorMessage, loading: false, needConfirm: false });
                }
            } catch (err) {
                this.setState({ loading: false });
                throw err;
            }
        }
    }

    sendEmail = async () => {
        const { username } = this.state;
        try {
            const response = await fetch(`/api/lib/confirmEmail?username=${username}`);
        } catch (e) {
            throw e;
        }
        console.log('hehey');
    }

    setCookies(data) {
        cookie.setCookie('authorization', data.token, 100);
        cookie.setCookie('username', data.result[0]["user_username"], 100);
        cookie.setCookie('address', data.result[0]["user_ethAddress"], 100);
        cookie.setCookie('isVerified', sha256('1'), 100);
    }
}

export default SignIn;