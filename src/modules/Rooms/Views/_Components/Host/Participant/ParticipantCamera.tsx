import React from 'react';
import VideoCamera from "../../../../../_CommonComponents/VideoCamera";
import '../../../_Styles/Host/ParticipantCamera.css';

const ParticipantCamera = (props: any) => {
  return (
    <VideoCamera className={'participant-camera d-flex justify-content-center flex-column'}
                 size="sm" video_id={props.participant.id}/>
  );
};

export default ParticipantCamera;
