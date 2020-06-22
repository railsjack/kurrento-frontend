import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import {ReactFacebookLoginInfo} from "react-facebook-login";
import {CallServerPromise} from "../../../../utils/app/call_server";
import userDetails from "../../__demo_data/userDetails";

class LoginViewModel extends ViewModelBase {
    userDetails:Observable;
    constructor() {
        super();
        this.userDetails = new Observable(this,'userDetails',null);
        this.setUserDetailsFunc();
    }
    setUserDetailsFunc(){
        this.userDetails.setValue(userDetails);
    }
    componentClicked = () => {
        console.log("component clicked");
    };

    loginInfoOrFailureResponse(response: ReactFacebookLoginInfo) {
        // @ts-ignore
        window.FB.getLoginStatus(
            async (loginResponse: any) => {
                if (loginResponse.status === 'connected') {
                    // @ts-ignore
                    const user_id = response.userID;
                    const email = response.email;
                    const name = response.name;
                    // @ts-ignore
                    const picture = response.picture.data.url;
                    // @ts-ignore
                    const oauth_type = response.graphDomain;
                    const oauth_token = response.accessToken;
                    // @ts-ignore
                    const expiration_time = response.data_access_expiration_time;
                    // @ts-ignore
                    const expires_in = response.expiresIn;
                    const data = {user_id, email, name, picture, oauth_type, oauth_token, expiration_time, expires_in};
                    const serverResponse:any = await CallServerPromise.checkToken({data});
                    if (serverResponse.result === 'success'){
                        window.location.pathname='/events/list/';
                        // this.userDetails.setValue(data);
                        // console.log(this.userDetails.getValue())
                    }
                }
            }
        );
    };

    async componentDidMount() {
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new LoginViewModel());
