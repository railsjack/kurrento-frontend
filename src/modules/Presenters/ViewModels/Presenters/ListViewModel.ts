import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import {CallServerPromise} from "../../../../utils/app/call_server";
import AppToast from "../../../../utils/misc/app_toast";

class ListView extends ViewModelBase {
    loading: boolean = true;
    presenters: Array<object> = [];
    appToast: AppToast;

    constructor() {
        super();
        this.appToast = new AppToast();
    }

    async loadPresenters() {
        this.loading = true;
        const response: any = await CallServerPromise.getAllEvents();
        this.loading = false;
        if (response.result !== 'success') this.appToast.errorMsg(response.msg);
        this.presenters = response.data;
        this.updateView();
    }

    joinRoom(data:any) {
        if(!data.username) {
            this.appToast.errorMsg('Please enter the username!');
            return false;
        }
        this.props.history.push(`/presenters/${data.event_id}/${data.username}/${data.audience_room}/live/`);
    }

    async componentDidMount() {
        this.loadPresenters();
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new ListView());
