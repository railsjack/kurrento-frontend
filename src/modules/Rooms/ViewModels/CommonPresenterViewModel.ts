import {Observable, ViewModelBase} from "../../_CommonModels/ViewModelBase";
import {CallServerPromise} from "../../../utils/app/call_server";

class CommonPresenterViewModel extends ViewModelBase {

    eventDetails: Observable;

    constructor() {
        super();
        this.eventDetails = new Observable(this, 'eventDetails', '');
    }

    async loadEventInfo(id:any){
        const response:any = await CallServerPromise.getEventById(id);
        return new Promise((resolve,reject)=>{
            if(response.result==='success'){
                this.eventDetails.setValue(response.data[0]);
                resolve(response.data[0])
            }else{
                reject(response)
            }
        });
    }
    setBodyBg(){
        const data = Observable.getReduxValue('eventDetails');
        if(data){
            const imgUrl = data.bg_image.replaceAll('\\','/');
            document.getElementsByTagName('body')[0].style.backgroundImage = 'url('+imgUrl+')';
            document.getElementsByTagName('body')[0].style.height = '100%';
            document.getElementsByTagName('body')[0].style.position = 'center';
            document.getElementsByTagName('body')[0].style.backgroundRepeat = 'no-repeat';
            document.getElementsByTagName('body')[0].style.backgroundSize = 'cover';
        }
    }
}

export default CommonPresenterViewModel;
