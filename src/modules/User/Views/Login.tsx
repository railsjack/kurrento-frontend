import React from 'react';
import FacebookLogin, {
    ReactFacebookFailureResponse,
    ReactFacebookLoginInfo,
    ReactFacebookLoginProps
} from 'react-facebook-login';
import {
    Button,
    Card,
    CardBody,
    CardGroup,
    CardHeader,
    Col,
    Container,
    Form, Input,
    InputGroup,
    InputGroupAddon, InputGroupText,
    Row
} from "reactstrap";
import useLoginViewModel from '../ViewModels/User/LoginViewModel';
import {Link} from "react-router-dom";

const SignIn = (props: any) => {
    const view = useLoginViewModel({props});

    // @ts-ignore
    let facebookAppId: string = process.env.REACT_APP_FACEBOOK_APP_ID;
    return (
        <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="8">
                        <CardGroup>
                            <Card className="p-4">
                                <CardBody>
                                    <Form>
                                        <h1>ZuluVideo</h1>
                                        <p className="text-muted">The best way to host online events.</p>
                                        <InputGroup className="mb-3">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-user"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="text" placeholder="Username" autoComplete="username"/>
                                        </InputGroup>
                                        <InputGroup className="mb-4">
                                            <InputGroupAddon addonType="prepend">
                                                <InputGroupText>
                                                    <i className="icon-lock"/>
                                                </InputGroupText>
                                            </InputGroupAddon>
                                            <Input type="password" placeholder="Password"
                                                   autoComplete="current-password"/>
                                        </InputGroup>
                                        <Row>
                                            <Col xs="6">
                                                <Button color="primary" className="px-4">Login</Button>
                                            </Col>
                                            <Col xs="2">
                                                <FacebookLogin
                                                    appId={facebookAppId}
                                                    autoLoad={true}
                                                    fields="name,email,picture"
                                                    onClick={view.componentClicked}
                                                    size={'small'}
                                                    callback={view.loginInfoOrFailureResponse}
                                                    cssClass={'btn btn-facebook btn-brand mr-1 mb-1 btn-md'}
                                                    icon={'fa fa-facebook'} textButton={''}
                                                />
                                            </Col>
                                            <Col xs="2">
                                                <Button size="md" className="btn-instagram btn-brand mr-1 mb-1">
                                                    <i className="fa fa-instagram"/>
                                                </Button>
                                            </Col>
                                            <Col xs="2">
                                                <Button size="md" className="btn-google-plus btn-brand icon mr-1 mb-1">
                                                    <i className="fa fa-google-plus"/>
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Form>
                                </CardBody>
                            </Card>
                            <Card className="text-white bg-primary py-5 d-md-down-none" style={{width: '44%'}}>
                                <CardBody className="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <p>Welcome to visit OnStage Video Conferencing System!</p>
                                        <Link to="/signup">
                                            <Button color="primary" className="mt-3" active tabIndex={-1}>Register
                                                Now!</Button>
                                        </Link>
                                    </div>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    )
};
export default SignIn
