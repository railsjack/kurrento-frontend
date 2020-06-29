import React from 'react';
import VideoCamera from "../../../_CommonComponents/VideoCamera";
import '../_Styles/ParticipantCamera.css';

const ParticipantCamera = (props: any) => {
  console.log(props.participant,'participant')
  return (
    <VideoCamera className={'participant-camera'} video_id={props.participant.id}/>
  );
}

export default ParticipantCamera;
