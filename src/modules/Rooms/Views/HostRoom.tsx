import React from 'react';
import {Observable} from "../../_CommonModels/ViewModelBase";
import '../../../assets/scss/room.scss'
import {Redirect} from "react-router";

import {Col, Row} from "reactstrap";
import PresenterRoomInfo from "./_Components/Host/Presenter/PresenterRoomInfo";
import PresenterCamera from "./_Components/Host/Presenter/PresenterCamera";
import ParticipantCameraList from "./_Components/Host/Participant/ParticipantCameraList";
import usePresentRoomViewModel from '../ViewModels/Presenters/PresenterRoomViewModel'
import usePresenterViewModel from "../ViewModels/Presenters/PresenterViewModel";

const HostRoom = (props: any) => {
    const urlParams = props.match.params;
    const userDetails = Observable.getReduxValue('userDetails');
    let username = '', roomname = '', userid = '', isPresenter = false;
    let data;
    let propsParams = props;
    if (userDetails) {
        username = userDetails['name'];
        userid = userDetails['user_id'];
        roomname = urlParams['id'];
        data = {username, roomname, userid, isPresenter};
        propsParams = Object.assign({}, props, {data});
    }
    let view = usePresenterViewModel({props: propsParams});
    setTimeout(() => {
        try {
            const elem: any = document.querySelectorAll('.toggle')[0];
            if (elem.classList[1] == 'toggle-off') elem.click()
        } catch (e) {
        }
    }, 1000);
    return (
        <div  className={'presenterRoomContainer'}>
            {userDetails && <PresenterRoomView participants={view.participants}/>}
            {!userDetails && <Redirect to={'/signin'}/>}
        </div>
    )
};
export default HostRoom;


const PresenterRoomView = (props: any) => {
    const view = usePresentRoomViewModel({props, initialCount: 1});
    const currentParticipantNum = view.getCurrentParticipantNumber();
    const users = view.getUsers();
    const presenters = users.presenters;
    const participants = users.participants;
    const audienceRooms = view.getAudienceRooms(participants);
    view.playPausedStreams();
    return (
        <>
            <Row>
                <Col>
                    <PresenterCamera presenters={presenters}/>
                    <PresenterRoomInfo
                        view={view}
                        totalUsers={view.totalUsers} currentParticipantNum={currentParticipantNum}
                        audienceRooms={audienceRooms}/>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ParticipantCameraList audienceRooms={audienceRooms}/>
                </Col>
            </Row>
        </>
    );
};





































