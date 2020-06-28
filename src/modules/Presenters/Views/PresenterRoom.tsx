import React from 'react';
import Room from '../_Components/Room';
import {Observable} from "../../_CommonModels/ViewModelBase";
import '../../../assets/scss/presenter.scss'
import {Redirect} from "react-router";

const PresenterRoom = (props: any) => {
    const urlParams = props.match.params;
    const userDetails = Observable.getReduxValue('userDetails');
    let username = '', roomname = '', userid = '', isPresenter = false;
    if (userDetails) {
        username = userDetails['name'];
        userid = userDetails['user_id'];
        roomname = urlParams['id'];

        const data = {username, roomname, userid, isPresenter};
        return (
            <>
                <Room data={data}/>
            </>
        )
    }
    return <Redirect to={'/signin'}/>
};
export default PresenterRoom;
