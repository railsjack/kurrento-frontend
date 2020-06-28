import openSocket from 'socket.io-client';

const uri: any = process.env.REACT_APP_API_URL;
const socket = openSocket(uri);
export default class SocketEvent {
    public participants: any = {};

    constructor() {
        this.loadSocket();
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
                    this.onReceiveVideoAnswer(message);
                    break;
                case 'candidate':

                    this.addIceCandidate(message);
                    break;
                case 'deleteUser':
                    this.deleteUser(message);
            }
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
    receiveVideo(message: any) {
    }

    joinRoom(data: any) {
        const {userName, roomName, audienceRoom} = data;
        const message = {
            event: 'joinRoom',
            userName: userName,
            roomName: roomName,
            audienceRoom: audienceRoom,
            isPresenter: false
        };
        this.sendMessage(message);
    }

    sendMessage(message: any) {
        socket.emit('message', message);
    }

    onExistingParticipants(message: any) {

    }

    onReceiveVideoAnswer(message: any) {
        const senderid = message.senderid;
        const sdpAnswer = message.sdpAnswer;
    }

    addIceCandidate(message: any) {
        const userid = message.userid;
        const candidate = message.candidate;
    }

    deleteUser(message: any) {

    }
}
