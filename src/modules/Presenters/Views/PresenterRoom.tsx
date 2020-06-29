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
    if (userDetails) {
        username = userDetails['name'];
        userid = userDetails['user_id'];
        roomname = urlParams['id'];
        const data = {username, roomname, userid, isPresenter};
        const propsParams = Object.assign({}, props, {data});
        const view = usePresenterViewModel({props: propsParams});
        return (
            <>
                <PresenterRoomView participants={view.participants}/>
            </>
        )
    }
    return <Redirect to={'/signin'}/>
};
export default PresenterRoom;


const PresenterRoomView = (props: any) => {
    const view = usePresentRoomViewModel({props, initialCount: 1});
    let audienceRooms = view.audienceRooms;
    const totalPresenters = 34;
    const currentPresenters = 12;
    const presentersAry: any = [];
    const participantsAry: any = [];
    Object.keys(props.participants).forEach((item, index) => {
        if (props.participants[item]['isPresenter']) {
            presentersAry.push(props.participants[item])
        } else {
            participantsAry.push(props.participants[item]);
        }
    });
    if (audienceRooms[0]) audienceRooms[0]["participants"] = participantsAry;
    useEffect(() => {
        view.updateView()
    }, [props.participants])
    return (
        <>
            <Row>
                <Col>
                    <PresenterCamera presenters={presentersAry}/>
                    <PresenterRoomInfo
                        view={view}
                        totalPresenters={totalPresenters} currentPresenters={currentPresenters}
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





































