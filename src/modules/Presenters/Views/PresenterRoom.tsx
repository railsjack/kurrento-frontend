import React from 'react';
import Room from '../_Components/Room';
import {Observable} from "../../_CommonModels/ViewModelBase";
import '../../../assets/scss/presenter.scss'
import {Container, Row, Col} from "reactstrap";
import PresenterVideo from '../_Components/Presenter/PresenterVideo';
import RoomNumberContainer from "../_Components/Presenter/RoomNumberContainer";
import AudienceContainer from "../_Components/Presenter/AudienceContainer";

const PresenterRoom = (props: any) => {
    const urlParams = props.match.params;
    const userDetails = Observable.getReduxValue('userDetails');
    const data = {
        userName: userDetails['name'],
        roomName: urlParams['id']
    };
    return (
        <>
            <Container fluid className={'pt-5'}>
                <Row>
                    <Col md={3}>
                        <PresenterVideo/>
                    </Col>
                    <Col md={8} className="offset-md-1">
                        <RoomNumberContainer/>
                    </Col>
                    <Col md={12}>
                        <AudienceContainer/>
                    </Col>
                </Row>
            </Container>
        </>
    )
};
export default PresenterRoom;
