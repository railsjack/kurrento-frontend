import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import Event from "../../Models/Event";
import {CallServerPromise} from "../../../../utils/app/call_server";
import AppToast from "../../../../utils/misc/app_toast";

class EventsView extends ViewModelBase {

    eventInfo: any;
    organizations: any = [];
    appToast: AppToast;
    events: any;
    loading: boolean = false;

    constructor() {
        super();
        this.eventInfo = new Event();
        this.appToast = new AppToast();
        this.loadOrgs();
    }

    async loadOrgs() {
        const userDetails = Observable.getReduxValue('userDetails');
        const response = await CallServerPromise.getOrgsForEvent({user_id: userDetails.user_id});
        if (response.data) {
            response.data.forEach((item: any, index: number) => {
                this.organizations[index] = {text: item['name'], value: item['org_id']}
            });
        }
        this.updateView()
    }

    async loadEvents() {

        this.loading = true;
        const userDetails = Observable.getReduxValue('userDetails');
        const response: any = await CallServerPromise.listEvents({user_id: userDetails.user_id});
        this.loading = false;
        if (response.result === 'success') this.events = response.data;
        this.updateView();
    }

    async deleteEvent(event_id: string) {
        if (!window.confirm('Are you sure want to delete?')) return;
        const response: any = await CallServerPromise.deleteEvent({event_id});
        if (response.result === 'success') {
            const index = this.events.findIndex((item: any) => {
                return item.event_id == event_id;
            });
            this.events.splice(index, 1);
            this.updateView();
            this.appToast.successMsg(response.msg);
        } else this.appToast.errorMsg(response.msg);
    }

    onEventInfoChanged(e: any) {
        const {name, value} = e.target;
        this.eventInfo[name] = value;
        this.updateView()
    };

    validEventData(data: any) {
        if (!data.name) {
            this.appToast.errorMsg('Please enter the event name!');
            return false;
        }
        if (!data.bg_image) {
            this.appToast.errorMsg('Background image is required!');
            return false;
        }
        if (!data.default_video_watermark) {
            this.appToast.errorMsg('Default video watermark is required!');
            return false;
        }
        if (data.attendance_type === 'password' && !data.attendance_password) {
            this.appToast.errorMsg('Please enter the password!');
            return false;
        }
        if (!data.start_time) {
            this.appToast.errorMsg('Start time is required!');
            return false;
        }
        if (!data.watermark_position) {
            this.appToast.errorMsg('Please select the watermark position!');
            return false;
        }
        if (!data.event_layout) {
            this.appToast.errorMsg('Please select the event layout!');
            return false;
        }
        return true;
    }

    async saveEvent() {
        const {
            event_id, org_id, name, bg_image, default_video_watermark, attendance_type,
            attendance_password, start_time, watermark_position, event_layout
        } = this.eventInfo;
        const userDetails = Observable.getReduxValue('userDetails');
        const data = {
            event_id, user_id: userDetails.user_id, org_id, name, bg_image, default_video_watermark, attendance_type,
            attendance_password, start_time, watermark_position, event_layout
        };
        if (!this.validEventData(data)) return;
        const response: any = await CallServerPromise.saveEvent(data);
        if (response.data.result === 'success') {
            this.props.history.push('/events/list/');
            this.appToast.successMsg(response.data.msg);
        } else this.appToast.errorMsg(response.data.msg)
    }

    liveEvent(event_id: string) {
        const userDetails = Observable.getReduxValue('userDetails');
        console.log(userDetails, 'userDetails');
        this.props.history.push(`/events/${event_id}/${userDetails.name}/live/`);
    }

    async componentDidMount() {
        this.loadEvents()
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new EventsView());
