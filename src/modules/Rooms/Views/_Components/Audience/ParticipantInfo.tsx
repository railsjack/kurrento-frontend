import React from 'react';
import {Button, Col} from "reactstrap";
import FacebookLogin from "react-facebook-login";
import '../../../../../assets/scss/room.scss'
import '../../_Styles/Audience/Audience.scss'
const ParticipantInfo = (props: any) => {
    const view = props.view;
    const onUsernameChange=(e:any)=>{
        view.username = e.target.value;
        view.updateView()
    };
    // @ts-ignore
    let facebookAppId: string = process.env.REACT_APP_FACEBOOK_APP_ID;
    return (
        <>
            <Col md={4} sm={6} xs={12} lg={3} className={'offset-lg-1'}>
                <video autoPlay={true} id="videoElement" className="participantInfoVideo">
                </video>
            </Col>
            <Col md={5} sm={6} xs={12} lg={4}>
                <div className="participantInfoBoard">
                    <FacebookLogin
                        appId={facebookAppId} autoLoad={false} fields="name,email,picture"
                        size={'small'} xfbml={true}
                        cssClass={'btn btn-facebook btn-brand btn-lg'} buttonStyle={{paddingLeft:20}}
                        onClick={(e) => {
                            view.componentClicked(e)
                        }}
                        callback={(e) => {
                            view.loginInfoOrFailureResponse(e)
                        }}
                        textButton={'Signin with facebook'}
                    />
                    <div className="divider"/>
                    <input type={'text'} value={view.username} onChange={onUsernameChange}
                           className={'input input-lg form-control'} placeholder="Name"/>

                    <Button type={'button'} color={'primary'} size={'lg'} onClick={()=>{view.joinRoom()}}
                            className={'mr-3'}>Enter</Button>

                </div>
            </Col>
        </>
    )
};
export default ParticipantInfo;
