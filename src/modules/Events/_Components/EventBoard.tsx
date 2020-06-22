import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Fade, Jumbotron, Row} from "reactstrap";

const EventBoard = (props: any) => {
    const event = props.data;
    const view = props.view;
    const [timeout, setTimeout] = useState(300)
    const [fadeIn, setFadeIn] = useState(true)
    const [collapse, setCollapse] = useState(true)
    return (
        <>
            <Col sm={6} md={6} className={'mt-5'}>
                <Fade timeout={timeout} in={fadeIn}>
                    <Card>
                        <CardHeader>
                            {event.name}
                        </CardHeader>
                        <Collapse isOpen={collapse} id="collapseExample">
                            <CardBody>
                                <p>Video watermark: <img src={event.default_video_watermark} width={75} height={'auto'}
                                              className={'ml-3'}/></p>
                                <p>Background Images: <img src={event.bg_image} width={100} height={'auto'}
                                                           className={'ml-3'}/>
                                </p>
                                <p>Event ID: {event.event_id}</p>
                                <p>
                                    <Button size={'md'} color={'danger'}
                                            className={'text-white pull-right mb-3 ml-3'}
                                            onClick={(e) => view.deleteEvent(event.event_id)}>
                                        <i className={'fa fa-trash'}></i>&nbsp;&nbsp;Delete
                                    </Button>
                                    <Button size={'md'} color={'success'}
                                            className={'text-white pull-right mb-3 ml-3'}
                                            onClick={(e) => view.liveEvent(event.event_id)}>
                                        <i className={'icon icon-login'}></i>&nbsp;&nbsp;Go Live
                                    </Button>
                                </p>
                            </CardBody>
                        </Collapse>
                    </Card>
                </Fade>
            </Col>
        </>
    )
};
export default EventBoard;
