import React, {useEffect} from 'react';
import Room from '../_Components/Room';
import {Observable} from "../../_CommonModels/ViewModelBase";
import '../../../assets/scss/presenter.scss'
import {Redirect} from "react-router";

import {Col, Row} from "reactstrap";
import PresenterRoomInfo from "./_Components/PresenterRoomInfo";
import PresenterCamera from "./_Components/PresenterCamera";
import ParticipantCameraList from "./_Components/ParticipantCameraList";
import usePresentRoomViewModel from '../ViewModels/Presenters/PresenterRoomViewModel'
import usePresenterViewModel from "../ViewModels/Presenters/PresenterViewModel";

const PresenterRoom = (props: any) => {
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
        <>
            {userDetails && <PresenterRoomView participants={view.participants}/>}
            {!userDetails && <Redirect to={'/signin'}/>}
        </>
    )
};
export default PresenterRoom;


const PresenterRoomView = (props: any) => {
    const view = usePresentRoomViewModel({props, initialCount: 1});
    console.log(props.participants,'props.participants')
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





































