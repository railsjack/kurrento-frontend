import {useViewModel} from "../../../_CommonModels/ViewModelBase";
import AppToast from "../../../../utils/misc/app_toast";
import {ReactFacebookLoginInfo} from "react-facebook-login";
import CommonPresenterViewModel from "../CommonPresenterViewModel";

class ParticipantView extends CommonPresenterViewModel {
    showRoom: boolean = false;
    username: string = '';
    appToast: AppToast;
    eventInfo: any;

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
                    this.username = response.name;
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
                    });
            }
        }
        await this.loadEventInfo(this.props.match.params.id);
        this.setBodyBg();
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new ParticipantView());
