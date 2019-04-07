import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Segment, Form, Input, Container, Button, Message, Grid, Step, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';
import NavBar from '../components/NavBar';

class ResetPassword extends Component {

    state = {
        matchingErr: '',
        password: '',
        passwordConfirm: '',
        email: '',
        emailErr: '',
        step: 1,
        isStepOne: true,
        isStepTwo: false,
        isStepThree: false
    }

    render() {
        return (
            <div>
                <Layout />
                <NavBar />
                <Segment textAlign='center' color='violet' inverted>
                    <br />
                    <br />
                    <Segment color='violet' inverted>
                        <Step.Group unstackable size='large'>
                            <Step active={this.state.isStepOne}>
                                <Icon name='mail' />
                                <Step.Content>
                                    <Step.Title>Verify Email</Step.Title>
                                    <Step.Description>Enter email to receive code</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active={this.state.isStepTwo}>
                                <Icon name='code' />
                                <Step.Content>
                                    <Step.Title>Confirm Code</Step.Title>
                                    <Step.Description>Enter code received in email</Step.Description>
                                </Step.Content>
                            </Step>
                            <Step active={this.state.isStepThree}>
                                <Icon name='repeat' />
                                <Step.Content>
                                    <Step.Title>Reset Password</Step.Title>
                                    <Step.Description>Create new Password</Step.Description>
                                </Step.Content>
                            </Step>
                        </Step.Group>
                    </Segment>
                    <Segment color='violet' inverted textAlign='center'>
                        <Container textAlign='center'>
                            <br />
                            <br />
                            <Grid>
                                <Container>
                                    <Grid>
                                        <Grid.Column width='4'></Grid.Column>
                                        <Grid.Column width='8' textAlign='center'>
                                            {this.renderStep()}
                                            <br />
                                            <Grid columns={3}>
                                                <Grid.Column width='2'></Grid.Column>
                                                <Grid.Column width='12'>
                                                    <Button basic inverted floated='left' onClick={this.back}>Back</Button>
                                                    <Button color='green' floated='right' onClick={this.nextStep}>Next</Button>
                                                </Grid.Column>
                                                <Grid.Column width='2'></Grid.Column>
                                            </Grid>
                                        </Grid.Column>
                                        <Grid.Column width='4'></Grid.Column>
                                        {/* <Grid.Column width='5' textAlign='center'></Grid.Column> */}
                                    </Grid>
                                </Container>

                            </Grid>
                        </Container>
                        <br />

                    </Segment>

                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </Segment>
            </div>
        )
    }

    nextStep = async () => {
        console.log("button clicked")
        switch (this.state.step) {
            case 1:
                if (this.verifyEmail() === true) {
                    await this.setState({ step: 2, isStepOne: false, isStepTwo: true, isStepThree: false });
                }
                else {
                    await this.setState({ emailErr: 'Incorrect Email' });
                }
                break;
            case 2:
                if (this.verifyCode() === true) {
                    await this.setState({ step: 3, isStepOne: false, isStepTwo: false, isStepThree: true })
                } else {
                    await this.setState({ codeErr: 'Invalid Code' });
                }
                break;
            case 3:
                if (this.verifyPasswords() === true) {
                    await this.setState({ matchingErr: "Password Don't Match" });
                } else {
                    //TODO: Update Password
                }
                break;

            default:
                break;
        }
    }

    back = async () => {
        switch (this.state.step) {
            case 2:
                await this.setState({ step: 1, isStepOne: true, isStepTwo: false, isStepThree: false });
                break;
            case 3:
                await this.setState({ step: 2, isStepOne: false, isStepTwo: true, isStepThree: false })
                break;

            default:
                break;
        }
    }

    verifyEmail() {
        //TODO: API to Verify that email's owner is a LoyaltyCocoon user
        return true;
    }

    renderStep() {
        if (this.state.step === 1) {
            return (<div>{this.renderEmail()}</div>)
        } else if (this.state.step === 2) {
            return (<div>{this.renderCode()}</div>)
        } else if (this.state.step === 3) {
            return (<div>{this.renderResetPassord()}</div>)
        }
    }

    renderEmail() {
        return (
            <div>
                <Form error={!!this.state.emailErr}>
                    <h1>Send Verification Code</h1>
                    <br />
                    <Form.Field>
                        <Input
                            placeholder='Enter your Account Email'
                            size='medium'
                            onChange={event => this.setState({ email: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops' content={this.state.emailErr} ></Message>
                    {/* <Button inverted basic onClick={this.sendCode}>Send</Button> */}
                </Form>
            </div>
        )
    }

    // sendCode = async () => {
    //     //TODO: fetch the send Code Api
    //     await this.setState({ step: 2, isStepTwo: true, isStepOne: false, isStepThree: false });
    // }

    renderCode() {
        return (
            <div>
                <Form error={!!this.state.codeErr}>
                    <h1>Confirm Code</h1>
                    <br />
                    <Form.Field>
                        <Input
                            placeholder='Enter Code'
                            size='medium'
                            onChange={event => this.setState({ code: event.target.value })}
                        />
                    </Form.Field>
                    <Message error header='Oops' content={this.state.codeErr} ></Message>
                    {/* <Button inverted basic onClick={this.verifyCode}>Send</Button> */}
                </Form>
            </div>
        )
    }

    verifyCode = () => {
        //TODO: Verify that the code inputted matches the one sent in the mail.
        return true;
    }

    renderResetPassord() {
        return (
            <div>
                <h1>Reset Your Password</h1>
                <Form error={!!this.state.matchingErr}>
                    <Form.Field>
                        <Input
                            type='password'
                            placeholder='Enter new Password'
                            size='medium'
                            onChange={event => this.setState({ password: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            type='password'
                            placeholder='Confirm Password'
                            size='medium'
                            onChange={event => this.setState({ passwordConfirm: event.target.value })}
                        />

                    </Form.Field>

                    <Message error header="Oops!" content={this.state.matchingErr}></Message>
                    {/* <Button onClick={this.changePassword} color='green' >Submit</Button> */}
                </Form>
            </div>
        )
    }

    verifyPasswords = () => {
        const { password, passwordConfirm } = this.state;

        console.log('in button');
        if (password !== passwordConfirm) {
            // var matchingErr = "Passwords Don't match!";
            // this.setState({ matchingErr });
            return false;
        } else {
            return true;
            // Router.pushRoute('/');
        }
    }
}

export default ResetPassword;