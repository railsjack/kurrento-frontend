import ModelBase from "../../_CommonModels/ModelBase";

class Organization extends ModelBase {
    // org_id, owner_user_id, name, logo_url, bg_images, created_at
    org_id: number;
    owner_user_id: number;
    name: string;
    logo_url: string;
    bg_images: Array<any>;
    created_at: string;

    constructor(params: any = {}) {
        super(params);
        this.org_id = params.org_id ?? '';
        this.owner_user_id = params.owner_user_id ?? '';
        this.name = params.name ?? '';
        this.logo_url = params.logo_url ?? '';
        this.bg_images = params.bg_images ?? [];
        this.created_at = params.created_at ?? '';
    }
}

export default Organization;
