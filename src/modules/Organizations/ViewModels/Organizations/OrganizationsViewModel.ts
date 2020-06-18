import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import Organization from "../../Models/Organization";
import {CallServerPromise} from "../../../../utils/app/call_server";
import AppToast from "../../../../utils/misc/app_toast";

class OrganizationView extends ViewModelBase {

    orgInfo: Organization;
    loading: boolean = true;
    organizations: Array<Organization> = [];
    appToast: AppToast;

    constructor() {
        super();
        // @ts-ignore
        this.orgInfo = new Organization();
        this.appToast = new AppToast();
    }

    async componentDidMount() {
        
        this.listOrgs();
    }

    async getOrgDataById(id: any) {
        const response = await CallServerPromise.getOrgDataById({id});
    }

    async saveOrg(props: any) {
        const userDetails = Observable.getReduxValue('userDetails');

        const orgInfo = Object.assign(this.orgInfo, {owner_user_id: userDetails.user_id});
        const response = await CallServerPromise.saveOrg(orgInfo);
        if (response.data.result === 'success') {
            props.history.push('/organization/list/');
            return this.appToast.successMsg(response.data.msg);
        }
        this.appToast.errorMsg(response.data.msg);
    }

    async listOrgs() {
        this.loading = true;
        const userDetails = Observable.getReduxValue('userDetails');
        const response = await CallServerPromise.listOrgs({user_id: userDetails.user_id});
        this.loading = false;
        this.organizations = response.data;
        this.updateView()
    }

    async deleteOrg(org_id: number) {
        if (!confirm('Are you sure want to delete?')) return;
        const deletedIndex = this.organizations.findIndex(item => {
            return item.org_id == org_id
        });
        const response: any = await CallServerPromise.deleteOrg({org_id});
        if (response.result === 'success') {
            this.appToast.successMsg(response.msg);
            const deletedIndex = this.organizations.findIndex(item => {
                return item.org_id == org_id
            });
            this.organizations.splice(deletedIndex, 1);
            this.updateView();
        } else {
            this.appToast.errorMsg(response.msg);
        }
    }

    componentWillUnmount() {
    }
}

export default useViewModel(new OrganizationView());
