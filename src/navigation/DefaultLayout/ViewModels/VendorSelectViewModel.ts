import {Observable, useViewModel, ViewModelBase} from "../../../modules/_CommonModels/ViewModelBase";
import {CallServerPromise} from "../../../utils/app/call_server";

class VendorSelectViewModel extends ViewModelBase {
  vendors: Observable;
  selected_vendor_id: Observable;

  constructor() {
    super();
    this.vendors = new Observable(this, 'vendors', []);
    this.selected_vendor_id = new Observable(this, 'selected_vendor_id', null);
  }

  async setVendor(event: any) {
    const selected_vendor_id = event.target.value;
    await this.selected_vendor_id.setValue(selected_vendor_id);
  }

  async loadVendors() {
    const vendorsData: any = await CallServerPromise.getVendorList();
    if(vendorsData) {
      await this.vendors.setValue(vendorsData.vendorArray);
    }
  }

  async componentDidMount() {
    await this.loadVendors();
  }

  componentWillUnmount() {
  }
}


export default useViewModel(new VendorSelectViewModel());
