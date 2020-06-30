import React from 'react';

import '../_Styles/VideoCamera.css'

const VideoCamera = (props: any) => {
    const onEnded = (e: any) => {
        console.log('onEnded', e);
    };
    const onPause = (e: any) => {
        e.target.play();
    };

    return (
        <>
            <video
                onEnded={onEnded}
                onPause={onPause}
                className={`video-camera ${props.className}`} webkit-playsinline="webkit-playsinline"
                id={props.video_id}
                muted={true} autoPlay={true}>Video camera
            </video>
        </>
    );
};

export default VideoCamera;
