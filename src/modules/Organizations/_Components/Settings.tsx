import React, {useState} from 'react';
import CustomInput from "../../_CommonComponents/CustomInput";
import ImageUploader from 'react-images-upload';

const Settings = (props: any) => {
    const view = props.view;
    const eventInfo = view.eventInfo;
    const [bg, setBg] = useState([]);
    const [waterMark, setWaterMark] = useState([]);
    const onBgImgDrop = (pictureFiles: any, pictureDataURLs: any) => {
        setBg(pictureFiles);
    };
    const onVideoWaterMarkDrop = (pictureFiles: any, pictureDataURLs: any) => {
        setWaterMark(pictureFiles);
    };
    const onEventInfoChanged = (e: any) => {
        const {name, value} = e.target;
        eventInfo[name] = value;
        view.updateView()
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

        <ImageUploader
            withIcon={true}
            buttonText='Choose background image'
            onChange={onBgImgDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withLabel={true}
            labelClass={'col-md-6 offset-md-2 text-center'}
            singleImage={true}
            withPreview={true}
            label={'Shown waiting for curtain, for room-selection in multi-room events. Recommend 2000x2000 pixel jpeg.'}
        />

        <ImageUploader
            withIcon={true}
            buttonText='Choose Video Watermark'
            onChange={onVideoWaterMarkDrop}
            imgExtension={['.jpg', '.gif', '.png', '.gif']}
            maxFileSize={5242880}
            withLabel={true}
            labelClass={'col-md-8 offset-md-2 text-center'}
            singleImage={true}
            withPreview={true}
            label={'Overlaid on presenter video stream.'}
        />
        <CustomInput.Select
            label='Watermark position' name='watermark_position' firstOptionText="--Select position--"
            optionsData={eventInfo.waterMarkPinPositions}
            onChange={onEventInfoChanged}/>
        <CustomInput.Select
            label='Choose Layout' name='event_layout' firstOptionText="--Select layout--" optionsData={eventInfo.event_layouts}
            onChange={onEventInfoChanged}/>
    </>)

};
export default Settings;
