import React from 'react';
import ParticipantView from './_Components/Audience/ParticipantView';
import useParticipantViewModel from "../ViewModels/Participants/ParticipantRoomViewModel";
import {Container, Row} from "reactstrap";
import ParticipantInfo from './_Components/Audience/ParticipantInfo';

const AudienceRoom = (props: any) => {
    const view = useParticipantViewModel({props});
    const urlParams = props.match.params;
    view.username = 'username';
    const data = {
        username: view.username,
        roomname: urlParams['id'],
        userid: '',
        isPresenter: false
    };
    view.showRoom = true;
    return (
        <>
            {!view.showRoom &&
            <Container fluid>
                <Row style={{marginTop: '30vh'}}>
                    <ParticipantInfo view={view} onSubmit={(e: any) => {
                        console.log(e)
                    }}/>
                </Row>
            </Container>
            }
            {view.showRoom && <ParticipantView data={data}/>}
        </>
    )
};
export default AudienceRoom;
