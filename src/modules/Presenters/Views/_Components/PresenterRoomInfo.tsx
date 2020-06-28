import React from 'react';
import '../_Styles/PresenterRoomInfo.css';
import ToggleButton from "./ToggleButton";

const PresenterRoomInfo = (props: any) => {
  const audienceRooms = props.audienceRooms;
  const view = props.view;
  const onToggle = (status: boolean, index: number) => {
    audienceRooms[index].enabled = status;
    view.updateView();
  }
  return (
    <div className={'info'}>
      <h3 className={'numbers'}>Audience: {props.totalPresenters}&nbsp;/&nbsp;{props.currentPresenters}</h3>
      <ul className={'buttons-list'}>
        {audienceRooms.map((audienceRoom: any, index: number) => (
          <li key={String(index)} className={'actions-list-item'}>
            <ToggleButton
              onToggle={(status: boolean) => onToggle(status, index)}
              on={audienceRoom.enabled} className={'actions-list-item-button'}>
              {audienceRoom.participants && audienceRoom.participants.length}
            </ToggleButton>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PresenterRoomInfo;