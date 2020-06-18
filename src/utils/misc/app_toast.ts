import {toast} from "react-toastify";

class AppToast {
  successMsg(msg: string) {
    return toast.success(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  errorMsg(msg: string) {
    return toast.error(msg, {
      position: toast.POSITION.TOP_RIGHT
    });
  };
}
export default AppToast;
