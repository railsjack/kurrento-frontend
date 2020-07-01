import React from 'react';
import VideoCamera from "../../../../../_CommonComponents/VideoCamera";
import '../../../_Styles/Host/PresenterCamera.css';
const PresenterCamera = (props: any) => {
    const presenters = props.presenters;
    return (
        <>
            {presenters.map((presenter: any, index: number) => (
                <VideoCamera className={'presenter-camera d-flex justify-content-center flex-column'}
                             size="md" key={index} video_id={presenter.id}/>
            ))}
        </>
    );
};

export default PresenterCamera;
