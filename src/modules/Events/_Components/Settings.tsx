import React from 'react';
import CustomInput from "../../_CommonComponents/CustomInput";

const Settings = (props: any) => {
    const view = props.view;
    const eventInfo = view.eventInfo;
    const onEventInfoChanged = (e: any) => {
        const {name, value} = e.target;
        eventInfo[name] = value;
        view.updateView();
    };
    return (<>
        <CustomInput.Radio
            prefix={'event'}
            label='Access Type' name='attendance_type' value={eventInfo.attendance_type}
            onChange={onEventInfoChanged}
            itemsData={eventInfo.attendance_types} inline={true}/>
        {eventInfo.attendance_type === 'protected' &&
        <CustomInput.Password
            type={'password'}
            prefix={'event'}
            label='Password' name='attendance_password' value={''}
            onChange={onEventInfoChanged}/>
        }
        <CustomInput.Date
            type={'date'}
            prefix={'event'}
            label='Next curtain' name='start_time' value={''}
            onChange={onEventInfoChanged}/>

    </>)

};
export default Settings;
