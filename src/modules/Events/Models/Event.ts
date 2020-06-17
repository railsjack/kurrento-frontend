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
            value: 'TOP_LEFT',
            text: 'TOP LEFT'
        },
        {
            value: 'TOP_RIGHT',
            text: 'TOP RIGHT'
        },
        {
            value: 'BOTTOM_RIGHT',
            text: 'BOTTOM RIGHT'
        },
        {
            value: 'BOTTOM_LEFT',
            text: 'BOTTOM LEFT'
        }
    ];
    event_layouts = [
        {
            value:'0',
            text:'Layout 1'
        },
        {
            value:'1',
            text:'Layout 2'
        },
        {
            value:'2',
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
