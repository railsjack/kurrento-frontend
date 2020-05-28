import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import openSocket from 'socket.io-client';

const socket = openSocket('wss://35.188.54.111:3000');

class PresenterView extends ViewModelBase {
    public roomName: string = '';
    public userName: string = '';
    public participants: Array<object> = [];
    public showRoomSelection: boolean = true;
    public showMeetingRoom: boolean = false;
    public user: object = {};

    constructor() {
        super();
        this.loadSocket();
    }

    sendMessage(message: any) {
        socket.emit('message', message);
    }

    joinRoom(data: any) {
        this.userName = data.userName;
        this.roomName = data.roomName;
        this.showRoomSelection = false;
        if (!this.roomName || !this.userName) {
            alert('Room and Name are required!');
        } else {
            const message = {
                event: 'joinRoom',
                userName: this.userName,
                roomName: this.roomName
            };
            this.sendMessage(message);
            this.showRoomSelection = false;
            this.showMeetingRoom = true;
            this.updateView();
        }
    }

    receiveVideo(userid: string, username: string, isPresenter: boolean) {
        const video = this.buildVideoElem(userid, username);
        const user: any = {
            id: userid,
            username: username,
            video: video,
            rtcPeer: null
        };
        // @ts-ignore
        console.log(username, 'this.username', this.userName)
        this.participants[user.id] = user;
        const options = {
            remoteVideo: video,
            mediaConstraints: {
                // audio: (isPresenter && username != this.userName),
                audio:true,
                video: true
            },
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

        console.log(options,'consoleoptions')
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
    buildVideoElem(userid:string, username:string){
        const video = document.createElement('video');
        const videoContainer = document.createElement('div');
        videoContainer.className = "videoContainer form-row col-md-4 col-sm-6 col-lg-3";
        const centeredDiv = document.createElement('div');
        centeredDiv.className = "mx-auto";
        const name = document.createElement('h3');
        name.className="userName text-center";
        if(username===this.userName) name.className+=' curUser';
        video.id = userid;
        video.autoplay = true;
        name.appendChild(document.createTextNode(username));
        centeredDiv.appendChild(video);
        centeredDiv.appendChild(name);
        videoContainer.appendChild(centeredDiv);
        document.getElementById('meetingRoom')?.appendChild(videoContainer);
        return video;
    }
    onExistingParticipants(userid: string, existingUsers: Array<object>) {

        const video = this.buildVideoElem(userid, this.userName);
        const user: any = {
            id: userid,
            username: this.userName,
            video: video,
            rtcPeer: null
        };
        this.user = user;
        this.updateView();
        this.participants[user.id] = user;
        const constraints = {
            audio: true,
            video: {
                mandatory: {
                    maxWidth: 240,
                    minWidth: 240,
                    maxHeight: 135,
                    minHeight: 135,
                    maxFrameRate: 15,
                    minFrameRate: 15
                }
            }
        };
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
            this.receiveVideo(element.id, element.name, element.isPresenter);
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

    loadSocket() {
        socket.on('message', (message: any) => {
            console.log('Message received: ' + message.event);
            switch (message.event) {
                case 'newParticipantArrived':
                    this.receiveVideo(message.userid, message.username, message.isPresenter);
                    break;
                case 'existingParticipants':
                    console.log(message,'new participantarrived');
                    this.onExistingParticipants(message.userid, message.existingUsers);
                    break;
                case 'receiveVideoAnswer':
                    this.onReceiveVideoAnswer(message.senderid, message.sdpAnswer);
                    break;
                case 'candidate':
                    this.addIceCandidate(message.userid, message.candidate);
                    break;
            }
        });
    }

    async componentDidMount() {
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new PresenterView());
