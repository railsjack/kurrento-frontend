import React from 'react';

import '../_Styles/VideoCamera.css'

const WATERMARK_POSITION: any = {
  1: {top: 0, left: 0},
  2: {top: 0, right: 0},
  3: {bottom: 0, right: 0},
  4: {bottom: 0, left: 0},
}
const VideoCamera = (props: any) => {
  const watermark = props.watermark;
  let className = props.className || '';
  const size = props.size || '';
  const onEnded = (e: any) => {
    console.log('onEnded', e);
  };
  const onPause = (e: any) => {
    e.target.play();
  };
  console.log(watermark && watermark.position);
  return (
    <div className={'video-camera-wrapper'}>
      {watermark &&
      <img
        className={'video-camera-watermark'}
        src={watermark.url}
        style={WATERMARK_POSITION[watermark.position]}
      />}
      <video
        onEnded={onEnded}
        onPause={onPause}
        className={`video-camera ${className + ' ' + size}`}
        webkit-playsinline="webkit-playsinline"
        id={props.video_id}
        muted={true} autoPlay={true}
        onLoadedData={() => props.onVideoDataLoad(true)}>
        Video camera
      </video>
    </div>
  );
};

export default VideoCamera;
