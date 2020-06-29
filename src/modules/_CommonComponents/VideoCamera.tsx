import React from 'react';

import '../_Styles/VideoCamera.css'

const VideoCamera = (props: any) => {

  return (
      <video className={`video-camera ${props.className}`} webkit-playsinline="webkit-playsinline" id={props.video_id}
             muted={true} autoPlay={true}>Video camera</video>
  );
}

export default VideoCamera;
