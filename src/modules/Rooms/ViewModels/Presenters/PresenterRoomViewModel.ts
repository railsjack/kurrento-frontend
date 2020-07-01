import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";

class PresenterRoomViewModel extends ViewModelBase {
    audienceRooms: any;
    initialCount: number;
    totalUsers: number = 30;

    constructor() {
        super();
        this.audienceRooms = [];
        this.initialCount = 0;
    }

    getCurrentParticipantNumber() {
        return Object.keys(this.props.participants).length - 1;
    }

    getUsers() {
        const presenters: any = [];
        const participants: any = [];
        Object.keys(this.props.participants).forEach((item, index) => {
            if (this.props.participants[item]['isPresenter']) {
                presenters.push(this.props.participants[item])
            } else {
                participants.push(this.props.participants[item]);
            }
        });
        return {presenters, participants}
    }

    groupBy(xs: any, key: any) {
        return xs.reduce((rv: any, x: any) => {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
        }, {});
    }

    getAudienceRooms(participants: any) {

        const participantsRooms = this.groupBy(participants, 'audienceRoom');
        Object.keys(participantsRooms).map((item: any, index: any) => {
            if (!this.audienceRooms[index]) this.audienceRooms[index] = {};
            this.audienceRooms[index]['participants'] = participantsRooms[item];
        });
        this.audienceRooms.forEach((item: any, index: any) => {
            if (!participantsRooms[index]) delete this.audienceRooms[index];
        });
        return this.audienceRooms;
    }

    playPausedStreams() {
        const audienceRooms = this.audienceRooms;
        const rooms = audienceRooms.filter((item: any) => {
            return item.enabled == true;
        });
        let pausedStreams:any = [];
        setTimeout(()=>{
            for (const room of rooms) {
                for (const participant of room.participants) {
                    const video: any = document.getElementById(participant.id);
                    if (video && video.paused && !video.srcObject){
                        video.srcObject = this.props.participants[participant.id].video?.srcObject;
                    }
                }
            }
            return pausedStreams;
        },1000);
    }

    componentDidMount() {

        this.initialCount = this.params.initialCount || this.initialCount;
        this.audienceRooms.map((audienceRoom: any, index: number) => (audienceRoom.enabled = index < this.initialCount))
        this.updateView();
    }
}

export default useViewModel(new PresenterRoomViewModel());
