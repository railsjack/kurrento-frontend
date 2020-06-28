import React from 'react';
import {Col, Row} from "reactstrap";
import PresenterRoomInfo from "./_Components/PresenterRoomInfo";
import PresenterCamera from "./_Components/PresenterCamera";
import ParticipantCameraList from "./_Components/ParticipantCameraList";
import usePresentRoomViewModel from '../ViewModels/Presenters/PresenterRoomViewModel'

const PresenterRoom = (props: any) => {
  const view = usePresentRoomViewModel({props, initialCount: 1});
  const audienceRooms = view.audienceRooms;
  const totalPresenters = 34;
  const currentPresenters = 12;
  return (
    <>
      <Row>
        <Col>
          <PresenterCamera/>
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
}

export default PresenterRoom;