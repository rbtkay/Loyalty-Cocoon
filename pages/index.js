import React, { Component } from 'react';
import { Form, Button, Message, Input, Container, Divider, Segment, Grid, Table, Image, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import { Router, Link } from '../routes';
import { sha256 } from 'js-sha256';
import loco from '../ethereum/loco';
import fetch from 'isomorphic-fetch';
let cookie = require('../cookie');
import ReactGA from 'react-ga';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        errorMessage: '',
        data: {},
        needConfirm: false
    };

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Layout />
                    <Segment color='violet' inverted>
                        <br /> <br /> <br />
                        <Grid>
                            <Grid.Column width='10' verticalAlign='middle' textAlign='center' >
                                <Image circular rounded src='../static/Logo.gif' centered size='small' />
                                <h1><i>Loyalty Cocoon</i></h1>
                            </Grid.Column>
                            <Grid.Column width='4' textAlign='center'>
                                <br /> <br />

                                <Form error={!!this.state.errorMessage} onSubmit={this.onSubmit}>
                                    <h1><Icon name='sign in' />Welcome Back</h1>
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
                                    <Message warning visible={this.state.needConfirm}><h5>Verify your Email</h5><p>if you did not receive a confirmation email, click <a className='button' style={{ border: 'none', background: 'transparent' }} onClick={this.sendEmail}>here</a></p></Message>
                                    <br />
                                    <Form.Button color="green" loading={this.state.loading} size='big' content='Sign In' />
                                    <br /><br />
                                </Form>
                                <Link href='/resetPassword'><a>Forgot Password ?</a></Link>
                            </Grid.Column>

                        </Grid>
                        <br /><br /><br />
                    </Segment>

                    <Segment textAlign='center' color='violet'>
                        <h2>How It Works</h2>
                        <Image src='/static/shop-earn-redeem.png' size='large' verticalAlign='middle'/>
                        <Grid columns={3}>
                            <Grid.Column>
                                <Segment color='violet' inverted>
                                    <h3><u>1 - Shop at Registered Vendors</u></h3>
                                    <p>Continue shopping as you normally would... Vendors from all over the world will want to be part of Loyalty Cocoon once word gets out ;)</p>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment color='violet' inverted>
                                    <h3><u>2 - Earn LOCO from ALL Vendors</u></h3>
                                    <p>Being a cardless loyalty program, your balance and all transactions are stored on a decentralized network</p>
                                </Segment>
                            </Grid.Column>

                            <Grid.Column>
                                <Segment color='violet' inverted>
                                    <h3><u>3 - Redeem Offered Products</u></h3>
                                    <p>Spend your LOCO through the platform on items of your choosing; and what's better than having spendable points anywhere, right?</p>
                                </Segment>
                            </Grid.Column>
                        </Grid>
                    </Segment>

                    <Segment>
                        <Grid columns={2} >
                            <Grid.Column verticalAlign='middle' textAlign='center'>
                                <h2>
                                    <Icon name='signup' />Join the Cocoon
                                </h2>
                                <br />
                                <p>Enroll to join an evergrowing community of shoppers!<br />
                                <i>Here's what's in store:</i><br />
                                Browse Millions of Promoted Products <br />
                            Earn & Spend a Global Currency (<b><i>LOCO</i></b>)<br /><br />
                            <h4>And the best of all...</h4><h3>No card needed!</h3>
                                </p>
                                <br /><br />
                                <Link href='/user/signup'>
                                    <Button
                                        size="big"
                                        color='violet'
                                        onClick={this.triggerEvent} >Join Us</Button>
                                </Link>
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                <Image src='/static/Join-Us.jpeg' centered rounded size='large' />
                            </Grid.Column>
                        </Grid>

                    </Segment>

                    <Segment inverted color='violet'>
                        <Grid columns={2} >
                            <Grid.Column>
                                <Image src='/static/Vendor.jpg' centered rounded size='large' />
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                <h2>
                                    <Icon name='shop' />Got Items to Promote?
                                </h2>
                                <Grid columns={3}>
                                    <Grid.Column><h4><Icon name='copy outline'/> Hand us a copy of products</h4> </Grid.Column>
                                    <Grid.Column><h4><Icon name='toggle on' /> Select which are offered</h4> </Grid.Column>
                                    <Grid.Column><h4><Icon name='chart line' /> Customer Retention & Graphs</h4></Grid.Column>
                                </Grid>
                                <br /><br />
                                <Link href='/vendor/signup'>
                                    <Button color='green' size="big">Build Cocoon</Button>
                                </Link>
                            </Grid.Column>
                        </Grid>

                    </Segment>
            </div>
        );
    }

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: '' });
        let isEmailVerified = true;

        const { username, password } = this.state;
        if (username === '' || password === '') {
            this.setState({
                errorMessage: 'Some Field are Missing!',
                loading: false
            });
        } else {
            const hashedPassword = sha256(password);
            try {

                const confirmation = window.location.href;

                const token = confirmation.split('/')[4];

                if (typeof token !== 'undefined') {
                    const jwt = require('jsonwebtoken');
                    const decodedToken = jwt.decode(token);
                    const username = decodedToken.username;

                    const response = await fetch(`/api/lib/verify?username=${username}`);
                    if (response.status !== 200) {
                        isEmailVerified = false;
                    }
                }

                let response = await fetch(`/api/auth/login?username=${username}&password=${hashedPassword}`);

                if (response.status === 200 && isEmailVerified === true) {
                    const data = await response.json();
                    this.setCookies(data);
                    const address = cookie.getCookie('address');
                    let balance = 0;
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

            if (response.status === 200) {
                alert('Confirmation Email Sent...');
            } else {
                alert('We Were not able to reach your email');
            }
        } catch (e) {
            throw e;
        }
    }

    setCookies(data) {
        cookie.setCookie('authorization', data.token, 100);
        cookie.setCookie('username', data.result[0]["user_username"], 100);
        cookie.setCookie('address', data.result[0]["user_ethAddress"], 100);
        cookie.setCookie('isVerified', sha256('1'), 100);
    }

    triggerEvent = () => {
        ReactGA.event({
            category: 'User',
            action: `SignUp`
        });
    }
}

export default SignIn;