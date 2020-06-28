import React from 'react';
import VideoCamera from "../../../_CommonComponents/VideoCamera";
import '../_Styles/PresenterCamera.css';

const PresenterCamera = (props: any) => {
  return (
    <VideoCamera className={'presenter-camera'} />
  );
}

export default PresenterCamera;