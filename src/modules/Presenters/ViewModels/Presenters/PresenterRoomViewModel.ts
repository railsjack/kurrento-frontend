import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";

const testAudienceRooms = [
  {enabled: true, participants: [1, 2, 3]},
  {enabled: true, participants: [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 61, 2, 3, 4, 5, 61, 2, 3, 4, 5, 6]},
  {enabled: true, participants: [1, 2, 3, 4]},
]


class PresenterRoomViewModel extends ViewModelBase {
  audienceRooms: Array<{}>;
  initialCount: number;

  constructor() {
    super();
    this.audienceRooms = [];
    this.initialCount = 0;
  }

  componentDidMount() {
    this.audienceRooms = testAudienceRooms;
    this.initialCount = this.params.initialCount || this.initialCount;
    this.audienceRooms.map((audienceRoom: any, index: number) => (audienceRoom.enabled = index < this.initialCount))
    this.updateView();
  }
}

export default useViewModel(new PresenterRoomViewModel());