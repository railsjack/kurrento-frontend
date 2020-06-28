import React from 'react';

import '../_Styles/VideoCamera.css'

const VideoCamera = (props: any) => {
  return (
    <div className={`video-camera ${props.className}`}>Video camera</div>
  );
}

export default VideoCamera;