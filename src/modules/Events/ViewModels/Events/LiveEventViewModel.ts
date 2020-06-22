import {useViewModel, ViewModelBase, Observable} from "../../../_CommonModels/ViewModelBase";
import AppToast from "../../../../utils/misc/app_toast";


class LiveEventView extends ViewModelBase {
    appToast: AppToast;
    constructor() {
        super();
        this.appToast = new AppToast();
    }
    async componentDidMount() {

    }

    componentWillUnmount() {
    }
}

export default useViewModel(new LiveEventView());
