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
    let propsParams;
    let view;
    if (userDetails) {
        username = userDetails['name'];
        userid = userDetails['user_id'];
        roomname = urlParams['id'];
        data = {username, roomname, userid, isPresenter};
        propsParams = Object.assign({}, props, {data});
        view = usePresenterViewModel({props: propsParams});
    }
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
    let audienceRooms = view.audienceRooms;
    const totalPresenters = 30;
    const currentPresenters = Object.keys(props.participants).length - 1;
    const presentersAry: any = [];
    const participantsAry: any = [];
    Object.keys(props.participants).forEach((item, index) => {
        if (props.participants[item]['isPresenter']) {
            presentersAry.push(props.participants[item])
        } else {
            participantsAry.push(props.participants[item]);
        }
    });
    const groupBy = function (xs:any, key:any) {
        return xs.reduce(function (rv:any, x:any) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    };
    const participantsRooms = groupBy(participantsAry, 'audienceRoom');
    Object.keys(participantsRooms).map((item:any,index:any)=>{
        if(!audienceRooms[index]) audienceRooms[index]={};
        audienceRooms[index]['participants'] =participantsRooms[item];
    });
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





































