import React from 'react';
import Room from '../_Components/Room';
import {Observable} from "../../_CommonModels/ViewModelBase";
const PresenterRoom = (props: any) => {
    const urlParams = props.match.params;
    const userDetails = Observable.getReduxValue('userDetails');
    const data = {
        userName: userDetails['name'],
        roomName: urlParams['id'],
        audienceRoom:process.env.REACT_APP_AUDIENCE_NUMBER_PER_ROOM
    };
    return <Room data={data}/>
};
export default PresenterRoom;
