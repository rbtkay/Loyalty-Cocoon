import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import { Segment, Form, Input, Container, Button, Message, Grid, Step, Icon } from 'semantic-ui-react';
import Layout from '../components/Layout';
import { Router } from '../routes';
import NavBar from '../components/NavBar';

class ResetPassword extends Component {

    state = {
        requiredCode: '',
        matchingErr: '',
        code: '',
        codeErr: '',
        password: '',
        passwordConfirm: '',
        email: '',
        emailErr: '',
        step: 1,
        isStepOne: true,
        isStepTwo: false,
        isStepThree: false,
        isNextLoading: false,
        isBackLoading: false
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
                                                    <Button basic inverted floated='left' loading={this.state.isBackLoading} onClick={this.back}>Back</Button>
                                                    <Button color='green' floated='right' loading={this.state.isNextLoading} onClick={this.nextStep}>Next</Button>
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
        await this.setState({ isNextLoading: true });

        switch (this.state.step) {
            case 1:
                this.verifyEmail();
                await this.setState({ isNextLoading: false });
                break;
            case 2:
                this.verifyCode();
                await this.setState({ isNextLoading: false });
                break;
            case 3:
                this.verifyPasswords();
                break;

            default:
                break;
        }
    }

    back = async () => {
        await this.setState({ isBackLoading: true });
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
        await this.setState({ isBackLoading: false });
    }

    async verifyEmail() {
        if (this.state.email === '') {
            await this.setState({ emailErr: 'You need to Provide your Email' });
        } else {
            try {
                //TODO: API to Verify that email's owner is a LoyaltyCocoon user
                await this.setState({ step: 2, isStepOne: false, isStepTwo: true, isStepThree: false });
            } catch (e) {
                await this.setState({ emailErr: 'Something Went Wrong...' });
            }
            // await this.setState({ emailErr: 'Incorrect Email' });
            return true;
        }
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
                            value={this.state.email}
                        />
                    </Form.Field>
                    <Message error header='Oops' content={this.state.emailErr} ></Message>
                </Form>
            </div>
        )
    }


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
                            value={this.state.code}
                        />
                    </Form.Field>
                    <Message error header='Oops' content={this.state.codeErr} ></Message>
                </Form>
            </div>
        )
    }

    verifyCode = async () => {
        if (this.state.code === '') {
            this.setState({ codeErr: 'You need to Provide a Valid Code' });
        } else {
            //TODO: Verify that the code inputted matches the one sent in the mail.
            try {
                const code = 1111;
                const response = code;
                console.log(response);
                if (this.state.code == response) {
                    await this.setState({ step: 3, isStepOne: false, isStepTwo: false, isStepThree: true });
                } else {
                    await this.setState({ codeErr: 'Invalid Code' });
                }
            } catch (e) {
                await this.setState({ codeErr: 'Something Went Wrong...' });
            }
        }
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
                            value={this.state.password}
                        />
                    </Form.Field>

                    <Form.Field>
                        <Input
                            type='password'
                            placeholder='Confirm Password'
                            size='medium'
                            onChange={event => this.setState({ passwordConfirm: event.target.value })}
                            value={this.state.passwordConfirm}
                        />

                    </Form.Field>

                    <Message error header="Oops!" content={this.state.matchingErr}></Message>
                    {/* <Button onClick={this.changePassword} color='green' >Submit</Button> */}
                </Form>
            </div>
        )
    }

    verifyPasswords = async () => {
        const { password, passwordConfirm } = this.state;

        if (password === '' || passwordConfirm === '') {
            await this.setState({ matchingErr: "Some Field are Empty", isNextLoading: false });
        } else if (password !== passwordConfirm) {
            await this.setState({ matchingErr: "Password Don't Match", isNextLoading: false });
        } else {
            //TODO: Update Password APi
            Router.pushRoute('/');
        }
    }
}

export default ResetPassword;