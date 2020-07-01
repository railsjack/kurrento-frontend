import React from "react";
// @ts-ignore
import {Col} from 'reactstrap';
import useParticipantViewModel from '../ViewModels/Participants/ParticipantViewModel';
import '../../../assets/scss/presenter.scss'

const ParticipantView = (props: any) => {
    const view = useParticipantViewModel({props});
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
export default ParticipantView;
