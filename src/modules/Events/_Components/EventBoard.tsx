import React, {useState} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Collapse, Fade, Jumbotron, Row, Input, FormGroup} from "reactstrap";
import CopyToClipboard from "react-copy-to-clipboard"

const EventBoard = (props: any) => {
    const event = props.data;
    const view = props.view;
    const [timeout, setTimeout] = useState(300);
    const [fadeIn, setFadeIn] = useState(true);
    const [collapse, setCollapse] = useState(true);
    return (
        <>
            <Col lg={12} xl={6} className={'mt-5'}>
                <Fade timeout={timeout} in={fadeIn}>
                    <Card>
                        <CardHeader>
                            {event.name}
                        </CardHeader>
                        <Collapse isOpen={collapse} id="collapseExample">
                            <CardBody>
                                <FormGroup>
                                    <Row>
                                        <Col md={2} xs={2}>
                                            <p className="text-center">Presenter URL:</p>
                                        </Col>
                                        <Col md={4} xs={4}>
                                            <CopyToClipboard
                                                text={`https://video.zuluvideo.com/_PRESENT_/${event.event_id}`}
                                                onCopy={() => view.appToast.successMsg('Successfully Copied !')}>
                                                <Button size={'md'} color={'primary'} className={''}>
                                                    <i className={'fa fa-copy'}/></Button>
                                            </CopyToClipboard>
                                            <Button size={'md'} color={'primary'} className={'ml-2'} target="_blank"
                                                    href={`/_PRESENT_/${event.event_id}`}>
                                                <i className={'fa fa-window-restore'}/></Button>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Input type="text"
                                                   value={`https://video.zuluvideo.com/_PRESENT_/${event.event_id}`}
                                                   disabled={true}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col md={2} xs={2}>
                                            <p className="text-center">Participant URL:</p>
                                        </Col>
                                        <Col md={4} xs={4}>
                                            <CopyToClipboard
                                                text={`https://video.zuluvideo.com/event/${event.event_id}`}
                                                onCopy={() => view.appToast.successMsg('Successfully Copied !')}>
                                                <Button size={'md'} color={'primary'} className={''}>
                                                    <i className={'fa fa-copy'}/></Button>
                                            </CopyToClipboard>
                                            <Button size={'md'} color={'primary'} className={'ml-2'} target="_blank"
                                                    href={`/event/${event.event_id}`}>
                                                <i className={'fa fa-window-restore'}/>
                                            </Button>
                                        </Col>
                                        <Col md={6} xs={6}>
                                            <Input type="text"
                                                   value={`https://video.zuluvideo.com/event/${event.event_id}`}
                                                   disabled={true}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <Row>
                                        <Col md={3} xs={3}>
                                            <p className="text-center">Video watermark:</p>
                                        </Col>
                                        <Col md={3} xs={3}>
                                            <img src={event.default_video_watermark} width={75} height={'auto'}/>
                                        </Col>
                                        <Col md={3} xs={3}>
                                            <p className="text-center">Background Image:</p>
                                        </Col>
                                        <Col md={3} xs={3}>
                                            <img src={event.bg_image} width={75} height={'auto'}/>
                                        </Col>
                                    </Row>
                                </FormGroup>
                                <FormGroup>
                                    <p>
                                        <Button size={'md'} color={'danger'}
                                                className={'text-white pull-right mb-3 ml-3'}
                                                onClick={(e) => view.deleteEvent(event.event_id)}>
                                            <i className={'fa fa-trash'}></i>&nbsp;&nbsp;Delete
                                        </Button>
                                    </p>
                                </FormGroup>
                            </CardBody>
                        </Collapse>
                    </Card>
                </Fade>
            </Col>
        </>
    )
};
export default EventBoard;
