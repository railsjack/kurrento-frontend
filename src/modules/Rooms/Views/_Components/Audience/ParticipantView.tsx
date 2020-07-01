import React, {useState} from "react";
// @ts-ignore
import {Col} from 'reactstrap';
import useParticipantViewModel from '../../../ViewModels/Participants/ParticipantViewModel';
import '../../../../../assets/scss/room.scss'
import '../../_Styles/Audience/Audience.scss'
import VideoCamera from "../../../../_CommonComponents/VideoCamera";

const ParticipantView = (props: any) => {
    const view = useParticipantViewModel({props});
    const participants = Object.keys(view.participants).map((item) => view.participants[item]) || [];
    const [presenterVideoLoaded, setPresenterVideoStatus] = useState(false);
    let presenterVideoClass = presenterVideoLoaded ? 'presenter-video-loaded' : '';
    return (
        <div className="mainContainer">
            <div className="presenterContainer">
                {participants && participants.map(
                    (participant: any, index: number) => {
                        if (participant.isPresenter) {
                            return <VideoCamera className={presenterVideoClass} video_id={participant.id} key={index}
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
