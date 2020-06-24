import React from 'react';
import {Button, Col, Container, Row} from "reactstrap";
import CustomInput from "../../_CommonComponents/CustomInput";
import FacebookLogin from "react-facebook-login";

const ParticipantInfo = (props: any) => {
    const view = props.view;
    const onUsernameChange=(e:any)=>{
        view.username = e.target.value;
        console.log(view.username);
    };
    // @ts-ignore
    let facebookAppId: string = process.env.REACT_APP_FACEBOOK_APP_ID;

    return (
        <>
            <Col md={3} className={'offset-md-1'}>
                <video autoPlay={true} id="videoElement" width={240} height={135}>
                </video>
            </Col>
            <Col md={4}>
                <CustomInput.Text value={view.username} name={'username'} onChange={onUsernameChange} label="Username"
                                  placeholder="Enter the username"/>
            </Col>
            <Col md={3}>
                <Button type={'button'} color={'primary'} size={'md'} onClick={()=>{view.joinRoom()}}
                className={'mr-3'}>Enter</Button>
                <FacebookLogin
                    appId={facebookAppId} autoLoad={false} fields="name,email,picture"
                    size={'small'} xfbml={true} icon={'fa fa-facebook'} textButton={''}
                    cssClass={'btn btn-facebook btn-brand mr-1 mb-1 btn-md'}
                    onClick={(e) => {
                        view.componentClicked(e)
                    }}
                    callback={(e) => {
                        view.loginInfoOrFailureResponse(e)
                    }}
                />
            </Col>
        </>
    )
};
export default ParticipantInfo;
