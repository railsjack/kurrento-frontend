import {Observable, useViewModel} from "../../../_CommonModels/ViewModelBase";
import openSocket from 'socket.io-client';
import CommonPresenterViewModel from "../CommonPresenterViewModel";

const uri: any = process.env.REACT_APP_API_URL;
const audienceNumberPerRoom: any = process.env.REACT_AUDIENCE_NUMBER_PER_ROOM;
const socket = openSocket(uri);

class PresenterView extends CommonPresenterViewModel {
    public roomName: string = '';
    public userName: string = '';
    public audienceRoom: number = 2;
    public participants: any = {};
    public isPresenter: boolean = false;
    public user: object = {};
    public audienceRoomMemberCount: any = process.env.REACT_APP_AUDIENCE_NUMBER_PER_ROOM;

    constructor() {
        super();
        this.loadSocket();
    }

    sendMessage(message: any) {
        socket.emit('message', message);
    }

    generateAudienceRoomNumber() {
    }

    joinRoom(data: any) {
        this.userName = data.userName;
        this.roomName = data.roomName;
        this.audienceRoom = data.audienceRoom;
        if (!this.roomName || !this.userName) {
            alert('Room and Name are required!');
        } else {
            const message = {
                event: 'joinRoom',
                userName: this.userName,
                roomName: this.roomName,
                audienceRoom: this.audienceRoom,
                isPresenter: this.isPresenter
            };
            this.sendMessage(message);
            this.updateView();
        }
    }

    receiveVideo(userdata: any) {
        if (!(this.isPresenter || userdata.isPresenter)) {
            // if (!(userdata.audienceRoom == this.audienceRoom)) return;
        }
        const userid = userdata.userid;
        const username = userdata.username;
        const isPresenter = userdata.isPresenter;
        const audienceRoom = userdata.audienceRoom;
        const video = this.buildVideoElem(userid, username, isPresenter, audienceRoom);
        const user: any = {
            id: userid,
            username: username,
            video: video,
            rtcPeer: null,
            isPresenter,
            audienceRoom
        };
        // @ts-ignore
        this.participants[user.id] = user;
        const constraints = this.getVideoConstraints(isPresenter);
        const options = {
            remoteVideo: video,
            mediaConstraints: constraints,
            onicecandidate: (candidate: any, wp: any) => {
                const message = {
                    event: 'candidate',
                    userid: user.id,
                    roomName: this.roomName,
                    candidate: candidate
                };
                this.sendMessage(message);
            }
        };

        // @ts-ignore
        user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
            function (err: any) {
                if (err) {
                    return console.error(err);
                }
                // @ts-ignore
                this.generateOffer(onOffer);
            }
        );
        const onOffer = (err: any, offer: any, wp: any) => {
            const message = {
                event: 'receiveVideoFrom',
                userid: user.id,
                roomName: this.roomName,
                sdpOffer: offer
            };
            this.sendMessage(message);
        };
    }

    buildVideoElem(userid: string, username: string, isPresenter: boolean, audienceRoom: string) {
        const video = document.createElement('video');
        const name = document.createElement('h3');
        name.className = "userName text-center";
        if (username === this.userName) name.className += ' curUser';
        video.id = userid;
        video.autoplay = true;
        video.muted = true;
        video.setAttribute('webkit-playsinline', 'webkit-playsinline');
        name.appendChild(document.createTextNode(username));
        if (isPresenter) {
            this.loadEventInfo(this.props.data.roomName)
                .then(data => {
                    this.setBodyBg()
                });
            document.getElementById('presenterVideo')?.appendChild(video);
            // document.getElementById('presenterVideo')?.appendChild(name);
        } else {
            let participantContainer = document.createElement('div');
            participantContainer.className = 'participantContainer';
            let videoContainer = document.getElementById(audienceRoom);
            if (!videoContainer) {
                videoContainer = document.createElement('div');
                videoContainer.className = "col-md-12";
                videoContainer.id = audienceRoom;
            }
            // name.style.width = '160px';
            participantContainer.appendChild(video);
            // participantContainer.appendChild(name);
            document.getElementById('audienceRoom')?.appendChild(participantContainer);
        }
        return video;
    }

    getVideoConstraints(isPresenter: boolean) {
        if (isPresenter) {
            return {
                audio: true,
                video: {
                    mandatory: {
                        minHeight: 270,
                        minWidth: 480
                    }
                }
            }
        }
        return {
            audio: true,
            video: {
                mandatory: {
                    minHeight: 90,
                    maxHeight: 90,
                    minWidth: 160,
                    maxWidth: 160
                }
            }
        }
    }

    onExistingParticipants(message: any) {
        const userid = message.userid;
        const existingUsers = message.existingUsers;
        console.log(existingUsers, 'existingUsers');
        this.isPresenter = message.isPresenter;
        const video = this.buildVideoElem(userid, this.userName, message.isPresenter, message.audienceRoom);
        const user: any = {
            id: userid,
            username: this.userName,
            video: video,
            rtcPeer: null
        };
        this.user = user;
        this.updateView();
        this.participants[user.id] = user;
        const constraints = this.getVideoConstraints(message.isPresenter);
        const options = {
            localVideo: video,
            mediaConstraints: constraints,
            onicecandidate: (candidate: any, wp: any) => {
                const message = {
                    event: 'candidate',
                    userid: user.id,
                    roomName: this.roomName,
                    candidate: candidate
                };
                this.sendMessage(message);
            }
        };
        // @ts-ignore
        user.rtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerSendonly(options,
            function (err: any) {
                if (err) {
                    return console.error(err);
                }
                // @ts-ignore
                this.generateOffer(onOffer)
            }
        );
        existingUsers.forEach((element: any) => {
            const existingUserData = {
                audienceRoom: element.audienceRoom,
                userid: element.id,
                isPresenter: element.isPresenter,
                username: element.name
            };
            this.receiveVideo(existingUserData);
        });
        const onOffer = (err: any, offer: any, wp: any) => {
            const message = {
                event: 'receiveVideoFrom',
                userid: user.id,
                roomName: this.roomName,
                sdpOffer: offer
            };
            this.sendMessage(message);
        };
    }

    onReceiveVideoAnswer(senderid: any, sdpAnswer: any) {
        // @ts-ignore
        this.participants[senderid].rtcPeer.processAnswer(sdpAnswer);
    }

    addIceCandidate(userid: any, candidate: any) {
        // @ts-ignore
        this.participants[userid].rtcPeer.addIceCandidate(candidate);
    }

    deleteUser(message: any) {
        const videoDiv = <HTMLVideoElement>document.getElementById(message.deleteUser)?.parentElement;
        if (videoDiv) videoDiv.remove();
        delete this.participants[message.deleteUser];
    }

    loadSocket() {
        socket.on('message', (message: any) => {
            switch (message.event) {
                case 'newParticipantArrived':
                    console.log(message, 'newParticipantArrived');
                    this.receiveVideo(message);
                    break;
                case 'existingParticipants':
                    this.onExistingParticipants(message);
                    break;
                case 'receiveVideoAnswer':
                    this.onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
                    break;
                case 'candidate':

                    this.addIceCandidate(message.userid, message.candidate);
                    break;
                case 'deleteUser':
                    this.deleteUser(message);
            }
        });
    }

    async componentDidMount() {
        const {userName, roomName} = this.props.data;
        const data = {userName, roomName, audienceRoom: this.audienceRoom};
        this.joinRoom(data);
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new PresenterView());
