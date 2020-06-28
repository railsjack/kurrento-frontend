import {Observable, useViewModel, ViewModelBase} from "../../../_CommonModels/ViewModelBase";
import Organization from "../../Models/Organization";
import {CallServerPromise} from "../../../../utils/app/call_server";
import AppToast from "../../../../utils/misc/app_toast";

class OrganizationView extends ViewModelBase {

    orgInfo: Organization;
    loading: boolean = false;
    organizations: Array<Organization> = [];
    appToast: AppToast;
    selectedOrgId: string = '';

    constructor() {
        super();
        // @ts-ignore
        this.orgInfo = new Organization();
        this.appToast = new AppToast();
    }

    async componentDidMount() {
        if (this.selectedOrgId) return this.getOrgDataById(this.selectedOrgId);
        if (this.props.history.location.pathname.includes('organization/list')) this.listOrgs();
    }

    async getOrgDataById(id: any) {
        this.loading = true;
        const response = await CallServerPromise.getOrgDataById({id});
        this.orgInfo = response.data;
        this.loading = false;
        this.updateView()
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
        if (!window.confirm('Are you sure want to delete?')) return;
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
