import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import AppToast from "../../../../utils/misc/app_toast";
import {ReactFacebookLoginInfo} from "react-facebook-login";
import {CallServerPromise} from "../../../../utils/app/call_server";

class ParticipantView extends ViewModelBase {
    showRoom: boolean = false;
    username: string = '';
    appToast: AppToast;

    constructor() {
        super();
        this.appToast = new AppToast();
    }

    componentClicked = () => {
    };

    loginInfoOrFailureResponse(response: ReactFacebookLoginInfo) {
        // @ts-ignore
        window.FB.getLoginStatus(
            async (loginResponse: any) => {
                if (loginResponse.status === 'connected') {
                    // @ts-ignore
                    this.username = response.name
                    this.showRoom = true;
                    this.updateView()
                }
            }
        );
    };

    joinRoom() {
        if (!this.username) {
            this.appToast.errorMsg('Please enter the name!');
            return;
        }
        this.showRoom = true;
        this.updateView()
    }

    async componentDidMount() {
        if (!this.showRoom) {
            const video = document.querySelector("#videoElement");
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({video: true})
                    .then(function (stream) {
                        if (video) { // @ts-ignore
                            video.srcObject = stream;
                        }
                    })
                    .catch(function (err0r) {
                        console.log("Something went wrong!");
                    });
            }
        }
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new ParticipantView());
