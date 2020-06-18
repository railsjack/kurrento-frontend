import {
    Button,
    Card,
    CardBody,
    CardGroup,
    Col,
    Container,
    Form, FormGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupText, Label,
    Row
} from 'reactstrap';
import React from "react";

const ApplyUserNameForm = (props: any) => {
    let roomName: string, userName: string, audienceRoom: string;
    const setDetails = () => {
        props.setRoomDetails({roomName, userName,audienceRoom})
    };

    const inputStyle = {
        fontSize: 15
    };
    return (<div className="app flex-row align-items-center">
        <Container>
            <Row className="justify-content-center">
                <Col md="8">
                    <CardGroup>
                        <Card className="p-4">
                            <CardBody>
                                <Form>
                                    <h1>OnStage</h1>
                                    <p className="text-muted">Join into the classroom</p>
                                    <InputGroup className="mb-3">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-user"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" style={inputStyle} placeholder="Username" onChange={(e) => {
                                            userName = e.target.value
                                        }}/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-lock"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" style={inputStyle} placeholder="Room" onChange={(e) => {
                                            roomName = e.target.value
                                        }}/>
                                    </InputGroup>
                                    <InputGroup className="mb-4">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="icon-people"/>
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input type="text" style={inputStyle} placeholder="Audience room"
                                               onChange={(e) => {
                                                   audienceRoom = e.target.value
                                               }}/>
                                    </InputGroup>

                                    <FormGroup row>
                                        <Col md="4">
                                            <Label>Is audience Manager?</Label>
                                        </Col>
                                        <Col md="8">
                                            <FormGroup check className="checkbox">
                                                <Input className="form-check-input" type="checkbox"/>
                                            </FormGroup>
                                        </Col>
                                    </FormGroup>
                                    <Row>
                                        <Col xs="12">
                                            <Button color="primary" className="px-4"
                                                    onClick={() => setDetails()}>Join</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </CardBody>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>
    </div>);
};

export default ApplyUserNameForm;
