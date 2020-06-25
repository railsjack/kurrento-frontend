import {useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import AppToast from "../../../../utils/misc/app_toast";
import {ReactFacebookLoginInfo} from "react-facebook-login";
import {CallServerPromise} from "../../../../utils/app/call_server";

class ParticipantView extends ViewModelBase {
    showRoom: boolean = false;
    username: string = '';
    appToast: AppToast;
    eventInfo:any;
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
        document.getElementsByTagName('body')[0].style.backgroundImage  ='none';
        console.log(document.getElementsByTagName('body')[0],'document.getElementsByTagName(\'body\')[0].style')
        this.showRoom = true;
        this.updateView()
    }
    async loadEventInfo(id:number){
        const response:any = await CallServerPromise.getEventById(id);
        if(response.result==='success'){
            this.eventInfo = response.data[0];
            const imgUrl = this.eventInfo.bg_image.replaceAll('\\','/');
            document.getElementsByTagName('body')[0].style.backgroundImage = 'url('+imgUrl+')';
            document.getElementsByTagName('body')[0].style.height = '100%';
            document.getElementsByTagName('body')[0].style.position = 'center';
            document.getElementsByTagName('body')[0].style.backgroundRepeat = 'no-repeat';
            document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';
            this.updateView();
        }
    }
    async componentDidMount() {
        this.loadEventInfo(this.props.match.params.id);
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
