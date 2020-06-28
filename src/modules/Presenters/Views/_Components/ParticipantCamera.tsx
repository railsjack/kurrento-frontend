import React from 'react';
import VideoCamera from "../../../_CommonComponents/VideoCamera";
import '../_Styles/ParticipantCamera.css';

const ParticipantCamera = (props: any) => {
  return (
    <VideoCamera className={'participant-camera'} />
  );
}

export default ParticipantCamera;