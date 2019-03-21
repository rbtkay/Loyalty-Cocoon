import React, { Component } from 'react';
import { Form, Button, Message, Input, Container, Divider, Segment, Grid, Table, Image } from 'semantic-ui-react';
import Layout from '../components/Layout';
import NavigationBar from '../components/NavigationBar';
import { Router } from '../routes';
import { sha256 } from 'js-sha256';
import { Link } from '../routes';

class SignIn extends Component {
    state = {
        username: '',
        password: '',
        loading: false,
        errorMessage: { message: '' },
        data: {}
    };

    onSubmit = async (req, res, event) => {
        this.setState({ loading: true, errorMessage: { message: '' } });

        // console.log(this.state.errorMessage);

        const { username, password } = this.state;
        const hashedPassword = sha256(password);

        try {
            var response = await fetch(`http://localhost:8000/api/user/auth?username=${username}&password=${hashedPassword}`);
            var data = await response.json();
            if (data.token) {
                req['authorization'] = data.token;
                localStorage.setItem('authorization', data.token);
                localStorage.setItem('username', data.result[0]["user_username"]);
                localStorage.setItem('address', data.result[0]["user_address"]);
                Router.pushRoute("/user/");
                // console.log(req['authorization']);
            } else {
                this.setState({ errorMessage: data });
                console.log(this.state.errorMessage);
            }
        } catch (err) {
            throw err;
        }

        this.setState({ loading: false });
    }

    render() {
        return (
            <div  >
                <Layout />
                <div >
                    {/* <div style={{ backgroundColor: "#7539e5", height: '600px' }}> */}
                    <Segment inverted color='violet'>
                        <br />
                        <br />
                        <br />
                        <Grid columns={2}>
                            <Grid.Column width='10' verticalAlign='middle' textAlign='center' >
                                <Image circular src='../static/default_product_image.jpg' centered size='small' />
                                <h1>Loyalty Cocoon</h1>
                            </Grid.Column>
                            <Grid.Column width='4' textAlign='center'>

                                <br />
                                <br />
                                {/* <Container textAlign=""> */}
                                {/* <Container className="ui raised very text segment" textAlign='center'> */}
                                {/* <Container> */}
                                {/* <Segment inverted color='violet'> */}
                                    <Form error={!!this.state.errorMessage["message"]}>
                                        <h1>Sign In</h1>
                                        <br/>
                                        {/* <Form.Group inline widths='5'> */}
                                        <Form.Field >
                                            {/* <label style={{ color: 'white' }}>Username</label> */}
                                            <Input
                                                placeholder="Username"
                                                name="username"
                                                value={this.state.username}
                                                onChange={event => this.setState({ username: event.target.value })}
                                            />
                                        </Form.Field>
                                        <br/>
                                        <Form.Field>
                                            {/* <label style={{ color: 'white' }}>Password</label> */}
                                            <Input
                                                placeholder="Password"
                                                name="password"
                                                value={this.state.password}
                                                onChange={event => this.setState({ password: event.target.value })}
                                            />
                                        </Form.Field>
                                        {/* </Form.Group> */}
                                        <Message error header="Oops!" content={this.state.errorMessage["message"]}></Message>
                                        <br />
                                        <br />
                                        <Button color="green" onClick={this.onSubmit} loading={this.state.loading}>Sign In!</Button>
                                    </Form>
                                {/* </Segment> */}
                                {/* </Container> */}
                            </Grid.Column>
                            <Grid.Column width='2'></Grid.Column>

                        </Grid>
                        <br />
                        <br />
                        <br />
                    </Segment>

                    {/* <Divider /> */}
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
                                <Link href='/user/userSignup'>
                                    <Button size="big" color='violet'>Sign Up</Button>
                                </Link>
                            </Grid.Column>
                            <Grid.Column textAlign='center' verticalAlign='middle'>
                                <Image src='../static/default_product_image.jpg' centered rounded size='large' />
                            </Grid.Column>
                        </Grid>

                    </Segment>

                    <Segment inverted color='violet'>
                        <Grid columns={2} >
                            <Grid.Column>
                                <Image src='../static/default_product_image.jpg' centered rounded size='large' />
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
                                <Link href='/user/userSignup'>
                                    <Button color='green' size="big">Sign Up</Button>
                                </Link>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                </div>
            </div>
        );
    }
}

export default SignIn;
