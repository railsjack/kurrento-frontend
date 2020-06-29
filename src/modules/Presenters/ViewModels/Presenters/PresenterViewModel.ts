import {useViewModel} from "../../../_CommonModels/ViewModelBase";
import openSocket from 'socket.io-client';
import CommonPresenterViewModel from "../CommonPresenterViewModel";

const uri: any = process.env.REACT_APP_API_URL;
const socket = openSocket(uri);

class PresenterView extends CommonPresenterViewModel {

    public roomName: string = '';
    public userName: string = '';
    public audienceRoom: number = 0;
    public participants: any = {};
    public isPresenter: boolean = false;
    public user: object = {};

    constructor() {
        super();
        this.loadSocket();
    }

    sendMessage(message: any) {
        socket.emit('message', message);
    }

    joinRoom(data: any) {
        const {username, roomname, isPresenter, userid} = data;
        if (!roomname || !username) {
            alert('Room and Name are required!');
        } else {
            const message = {
                event: 'joinRoom',
                username: username,
                roomname: roomname,
                userid: userid,
                isPresenter: isPresenter
            };
            this.sendMessage(message);
            this.updateView();
        }
    }

    async receiveVideo(userdata: any) {
        const {userid, username, isPresenter, audienceRoom} = userdata;
        const user: any = {
            id: userid,
            username: username,
            rtcPeer: null,
            isPresenter,
            audienceRoom
        };

        this.participants[user.id] = user;
        this.updateView();
        const video = await this.buildVideoElem(userid, username, isPresenter, audienceRoom);
        // this.participants[user.id]['video'] = video;
        // @ts-ignore
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
        console.log(userid,'buildVideoElem')
        return new Promise((resolve, reject) => {
            const videoInterval = setInterval(() => {
                const video = document.getElementById(userid);
                if (video) {
                    clearInterval(videoInterval);
                    resolve(video);
                }
            }, 1000);
        });
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

    async onExistingParticipants(message: any) {
        const userid = message.userid;
        const existingUsers = message.existingUsers;
        this.isPresenter = message.isPresenter;
        const user: any = {
            id: userid,
            username: this.userName,
            rtcPeer: null,
            audienceRoom: message.audienceRoom,
            isPresenter: message.isPresenter
        };
        this.participants[user.id] = user;
        this.updateView();
        const video = await this.buildVideoElem(userid, this.userName, message.isPresenter, message.audienceRoom);
        // this.participants[user.id]['video'] = video;
        this.user = user;
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
        delete this.participants[message.deleteUser];
        this.updateView();
    }

    loadSocket() {
        socket.on('message', (message: any) => {
            switch (message.event) {
                case 'newParticipantArrived':
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
        const {username, roomname, userid, isPresenter} = this.props.data;
        this.roomName = roomname;
        this.userName = username;
        const data = {username, roomname, userid, isPresenter};
        this.joinRoom(data);
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new PresenterView());
