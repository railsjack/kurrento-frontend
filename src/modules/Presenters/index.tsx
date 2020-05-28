import React from "react";
// @ts-ignore
import {Container, Row, Col} from 'reactstrap';
import usePresenterViewModel from './ViewModels/Presenters/PresenterViewModel';
import ApplyUserNameForm from "./_Components/ApplyUserNameForm";
import '../../assets/scss/presenter.scss'

const Presenters = (props: any) => {
    const view = usePresenterViewModel({props});
    return (
        <>
            <Container>
                <Row>
                    <Col md={12}>
                        {
                            view.showRoomSelection &&
                            <ApplyUserNameForm setRoomDetails={(e: object) => view.joinRoom(e)}/>
                        }
                    </Col>

                </Row>
            </Container>
            {
                view.showMeetingRoom &&
                <Row className={'p-5'}>
                    <Col md={12}>
                        <div id="meetingRoom"></div>
                    </Col>
                </Row>
            }
        </>
    );
};
export default Presenters;
