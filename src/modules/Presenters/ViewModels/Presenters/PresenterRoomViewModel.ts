import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";

class PresenterRoomViewModel extends ViewModelBase {
    audienceRooms: Array<{}>;
    initialCount: number;
    totalPresenters: number = 30;

    constructor() {
        super();
        this.audienceRooms = [];
        this.initialCount = 0;
    }
    componentDidMount() {

        this.initialCount = this.params.initialCount || this.initialCount;
        this.audienceRooms.map((audienceRoom: any, index: number) => (audienceRoom.enabled = index < this.initialCount))
        this.updateView();
    }
}

export default useViewModel(new PresenterRoomViewModel());
