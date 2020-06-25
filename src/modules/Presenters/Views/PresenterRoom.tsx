import React from 'react';
import Room from '../_Components/Room';
import {Observable} from "../../_CommonModels/ViewModelBase";
import '../../../assets/scss/presenter.scss'
const PresenterRoom = (props: any) => {
    const urlParams = props.match.params;
    const userDetails = Observable.getReduxValue('userDetails');
    const data = {
        userName: userDetails['name'],
        roomName: urlParams['id']
    };
    return <Room data={data}/>
};
export default PresenterRoom;
