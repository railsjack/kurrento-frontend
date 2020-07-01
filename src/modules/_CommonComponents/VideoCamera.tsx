import React from 'react';

import '../_Styles/VideoCamera.css'

const VideoCamera = (props: any) => {
    let className = props.className || '';
    const size = props.size || '';
    const onEnded = (e: any) => {
        console.log('onEnded', e);
    };
    const onPause = (e: any) => {
        e.target.play();
    };
    return (
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
    );
};

export default VideoCamera;
