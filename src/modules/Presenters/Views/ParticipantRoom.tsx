import React from 'react';
import Room from '../_Components/Room';
import useParticipantViewModel from "../ViewModels/Participants/ParticipantViewModel";
import {Container, Row} from "reactstrap";
import ParticipantInfo from '../_Components/ParticipantInfo';

const ParticipantRoom = (props: any) => {
    const view = useParticipantViewModel({props});
    const urlParams = props.match.params;

    // const currentDate = String(Date.now());
    //
    // view.username = 'user' + currentDate.slice(currentDate.length - 2, currentDate.length);

    const data = {
        userName: view.username,
        roomName: urlParams['id']
    };
    // view.joinRoom()
    return (
        <>
            {!view.showRoom &&
            <Container fluid>
                <Row style={{marginTop:'30vh'}}>
                    <ParticipantInfo view={view} onSubmit={(e: any) => {
                        console.log(e)
                    }}/>
                </Row>
            </Container>
            }
            {view.showRoom && <Room data={data}/>}
        </>
    )
};
export default ParticipantRoom;
