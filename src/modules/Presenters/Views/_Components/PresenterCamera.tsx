import React from 'react';
import VideoCamera from "../../../_CommonComponents/VideoCamera";
import '../_Styles/PresenterCamera.css';
const PresenterCamera = (props: any) => {
    const presenters = props.presenters;
    return (
        <>
            {presenters.map((presenter: any, index: number) => (
                <VideoCamera className={'presenter-camera'} key={index} video_id={presenter.id}/>
            ))}
        </>
    );
}

export default PresenterCamera;
