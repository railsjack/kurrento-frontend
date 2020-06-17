import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import Event from "../../Models/Event";

class EventsView extends ViewModelBase {

    eventInfo: any;

    constructor() {
        super();
        this.eventInfo = new Event();
    }

    onEventInfoChanged(e: any) {
        const {name, value} = e.target;
        this.eventInfo[name] = value;
        this.updateView()
    };
    saveEvent(){
        console.log(this.eventInfo,'eventInfo');
    }
    async componentDidMount() {
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new EventsView());
