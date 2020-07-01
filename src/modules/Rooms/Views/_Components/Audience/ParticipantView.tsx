import React, {useState} from "react";
// @ts-ignore
import useParticipantViewModel from '../../../ViewModels/Participants/ParticipantViewModel';
import '../../../../../assets/scss/room.scss'
import '../../_Styles/Audience/Audience.scss'
import VideoCamera from "../../../../_CommonComponents/VideoCamera";
import {Observable} from "../../../../_CommonModels/ViewModelBase";

const ParticipantView = (props: any) => {
    const view = useParticipantViewModel({props});

    const participants = Object.keys(view.participants).map((item) => view.participants[item]) || [];
    const [presenterVideoLoaded, setPresenterVideoStatus] = useState(false);
    let presenterVideoClass = presenterVideoLoaded ? 'presenter-video-loaded' : '';
    if (presenterVideoLoaded) {
        const eventDetails = Observable.getReduxValue('eventDetails');
        const watermark_image = eventDetails.default_video_watermark.replaceAll('\\', '/');
        const watermark_position = eventDetails.watermark_position;
        console.log(eventDetails,'eventDetails');
    }
    return (
        <div className="mainContainer">
            <div className={'presenterContainer ' + presenterVideoClass}>
                {participants && participants.map(
                    (participant: any, index: number) => {
                        if (participant.isPresenter) {
                            return <VideoCamera video_id={participant.id} key={index}
                                                onVideoDataLoad={() => setPresenterVideoStatus(true)}/>
                        }
                    })
                }
            </div>
            <div className="audienceContainer">
                {participants && participants.map(
                    (participant: any, index: number) => {
                        if (!participant.isPresenter) {
                            return <VideoCamera size="sm" video_id={participant.id} key={index}/>
                        }
                    })
                }
            </div>
        </div>
    );
};
export default ParticipantView;
