import React, {useState} from 'react';
import ImageUploader from "react-images-upload";
import CustomInput from "../../_CommonComponents/CustomInput";

const Theme = (props: any) => {

    const view = props.view;
    const eventInfo = view.eventInfo;
    const onBgImgDrop = (pictureFiles: any, pictureDataURLs: any) => {
        eventInfo['bg_image'] = pictureDataURLs[0];
    };
    const onVideoWaterMarkDrop = (pictureFiles: any, pictureDataURLs: any) => {
        eventInfo['default_video_watermark'] = pictureDataURLs[0];
    };
    const onEventInfoChanged = (e: any) => {
        const {name, value} = e.target;
        eventInfo[name] = value;
    };
    return (
        <>

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
                label='Choose Layout' name='event_layout' firstOptionText="--Select layout--"
                optionsData={eventInfo.event_layouts}
                onChange={onEventInfoChanged}/>
        </>
    )
};
export default Theme;
