import ModelBase from "../../_CommonModels/ModelBase";

class Event extends ModelBase {
    event_id: number;
    org_id: any;
    name: string;
    bg_image: string;
    default_video_watermark: string;
    attendance_type : string;
    attendance_password: string;
    start_time: string;
    watermark_position: string;
    event_layout: string;
    attendance_types = [
        {
            value: 'public', text: 'Public'
        },

        {
            value: 'protected', text: 'Password Protected'
        }
    ];
    waterMarkPinPositions = [
        {
            value: 1,
            text: 'TOP LEFT'
        },
        {
            value: 2,
            text: 'TOP RIGHT'
        },
        {
            value: 3,
            text: 'BOTTOM RIGHT'
        },
        {
            value: 4,
            text: 'BOTTOM LEFT'
        }
    ];
    event_layouts = [
        {
            value:1,
            text:'Layout 1'
        },
        {
            value:2,
            text:'Layout 2'
        },
        {
            value:3,
            text:'Layout 3'
        }
    ];
    constructor(params: any = {}) {
        super(params);
        this.event_id = params.event_id ?? '';
        this.org_id = params.org_id ?? '';
        this.name = params.name ?? '';
        this.bg_image = params.bg_image ?? '';
        this.default_video_watermark = params.default_video_watermark ?? '';
        this.attendance_type  = params.attendance_type  ?? 'public';
        this.attendance_password = params.attendance_password ?? '';
        this.start_time = params.start_time ?? '';
        this.watermark_position = params.watermark_position ?? '';
        this.event_layout = params.event_layout ?? '';
    }
}

export default Event;
