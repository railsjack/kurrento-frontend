import React from 'react';
import '../_Styles/ParticipantRoom.css'
import ParticipantCamera from "./ParticipantCamera";

const AudienceRoom = (props: any) => {
  const {participants, enabled} = props;
  return enabled ? (
    <>
      <ul className='participant-list'>
        {participants.map((participant: any, index: number) => (
          <li key={String(index)} className='participant-list-item'>
            <ParticipantCamera participant={participant}/>
          </li>
        ))}
      </ul>
      <div className='clearfix'/>
    </>) : null;
}

const ParticipantCameraList = (props: any) => {
  const audienceRooms = props.audienceRooms;
  return (
    <div className='participant-list-container'>
      {audienceRooms.map((audienceRoom: any, index: number) =>
        <AudienceRoom key={String(index)} enabled={audienceRoom.enabled} participants={audienceRoom.participants}/>
      )}
    </div>
  );
}

export default ParticipantCameraList;
