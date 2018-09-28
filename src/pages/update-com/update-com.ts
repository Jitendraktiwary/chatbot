import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { CompanyDetailPage } from '../company-detail/company-detail';
/**
 * Generated class for the UpdateComPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-update-com',
  templateUrl: 'update-com.html',
})
export class UpdateComPage {
  comp_name:any;
  address:any;
  pincode:any;
  constructor(private loadingController: LoadingController,private ApiServiceProvider: ApiServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.comp_name=this.navParams.get("comp_name");
    this.address=this.navParams.get("address");
    this.pincode=this.navParams.get("pincode");
  }

  ionViewDidLoad() {
   
  }
  submit(){
    let json_data:any=[];
    json_data={'update_section':'PROFILE', "pincode": this.pincode,"address": this.address, "co_name": this.comp_name,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    let loader = this.loadingController.create({
      content: "Loading, Please wait"
    }); 
    loader.present();
    this.ApiServiceProvider.update_company_details(json_data).subscribe((res) => {
     
      loader.dismiss();
      if(res.SUCCESS){
        this.navCtrl.push(CompanyDetailPage);
      }
      
    }, (error) => {
      loader.dismiss();
      console.log(error);
    })
  }

  eventHandler_code(code,keyword:any)
  {         
     if(code == 13)
      {
        this.submit()
            
      }   

  }

}
