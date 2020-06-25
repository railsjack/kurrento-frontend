import React from "react";
// @ts-ignore
import {Col} from 'reactstrap';
import usePresenterViewModel from '../ViewModels/Presenters/PresenterViewModel';
import '../../../assets/scss/presenter.scss'

const Room = (props: any) => {
    console.log('hey there...')
    const view = usePresenterViewModel({props});
    return (
        <>
            <Col md={12} className="pl-0 pr-0">
                <div id="presenterVideo"/>
            </Col>
            <Col md={12} className={'pl-0 pr-0'}>
                <div id="audienceRoom"/>
            </Col>
        </>
    );
};
export default Room;
