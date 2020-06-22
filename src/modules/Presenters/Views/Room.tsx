import React from "react";
// @ts-ignore
import {Container, Row, Col} from 'reactstrap';
import usePresenterViewModel from '../ViewModels/Presenters/PresenterViewModel';
import ApplyUserNameForm from "../_Components/ApplyUserNameForm";
import '../../../assets/scss/presenter.scss'

const Room = (props: any) => {
    const view = usePresenterViewModel({props});
    return (
        <>
            <Container fluid={'true'}>
                <Row>
                    <Col md={8} className={'offset-md-2'}>
                        <div id="presenterVideo"></div>
                    </Col>
                    <Col md={12}>
                        <div id="audienceRoom"></div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default Room;
