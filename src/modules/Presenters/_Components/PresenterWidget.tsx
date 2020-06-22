import React from 'react';
import {Button, Card, CardBody, CardHeader, Col, Jumbotron, Row} from "reactstrap";
import '../../../assets/scss/presenter.scss'
import CustomInput from "../../_CommonComponents/CustomInput";

let userInfo:any = {
    audience_room: '',
    username: '',
    event_id:''
};
const PresenterWidget = (props: any) => {
    const view = props.view;
    const data = props.data;
    userInfo.event_id  = data.event_id;
    const imageUrl = data.bg_image.replaceAll("\\", '\/');
    const setInfo = (e: any) => {
        const {name, value} = e.target;
        userInfo[name] = value;
        view.updateView();
    };
    return (
        <Col md={6}>
            <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"/><strong>{data.name}</strong>
                </CardHeader>
                <CardBody>
                    <Jumbotron style={{backgroundImage: "url(" + imageUrl + ")", backgroundSize: 'cover'}}>
                        <CustomInput.Text value={userInfo.audience_room} placeholder={'Enter the audience room.'}
                                          name={'audience_room'} label={'Audience Room'}
                                          labelClass={'text-white'}
                                          onChange={(e: any) => {
                                              setInfo(e)
                                          }}
                        />
                        <CustomInput.Text value={userInfo.username} placeholder={'Enter your name'} name={'username'}
                                          label={'Name'}
                                          labelClass={'text-white'}
                                          onChange={(e: any) => {
                                              setInfo(e)
                                          }}
                        />
                        <Row>
                            <Col md={8} className={'offset-md-2'}>
                                <Button color="primary" size='sm' className={'pull-right'}
                                        onClick={() => {
                                            view.joinRoom(userInfo)
                                        }}>
                                    <i className={'icon icon-login'}></i>&nbsp;&nbsp;JOIN
                                </Button>
                            </Col>
                        </Row>
                    </Jumbotron>
                </CardBody>
            </Card>
        </Col>
    )
};
export default PresenterWidget;
