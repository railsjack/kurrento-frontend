import React from 'react';
import {Card, CardBody, CardHeader, Col, Row} from "reactstrap";

const ComponentContainer = (props: any) => (
    <Row>
        <Col className={props.className}>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"/><strong>{props.title}</strong>
                    {props.headerComponent}
                </CardHeader>
                <CardBody>
                    {props.children}
                </CardBody>
            </Card>
        </Col>
    </Row>
)

export default ComponentContainer;
