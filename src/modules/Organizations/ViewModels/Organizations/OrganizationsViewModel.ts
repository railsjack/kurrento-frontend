import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import Organization from "../../Models/Organization";
import {CallServerPromise} from "../../../../utils/app/call_server";
class OrganizationView extends ViewModelBase {

    orgInfo:Organization;
    constructor() {
        super();
        // @ts-ignore
        this.orgInfo =  new Organization();
    }

    async componentDidMount() {
    }
    async saveOrg(){
        const userDetails = Observable.getReduxValue('userDetails');
        const orgInfo = Object.assign(this.orgInfo,{owner_user_id:userDetails.user_id});
        const response = await CallServerPromise.saveOrg(orgInfo);
    }
    componentWillUnmount() {
    }
}

export default useViewModel(new OrganizationView());
