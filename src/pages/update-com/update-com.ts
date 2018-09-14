import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
  constructor(private ApiServiceProvider: ApiServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.comp_name=this.navParams.get("comp_name");
    this.address=this.navParams.get("address");
    this.pincode=this.navParams.get("pincode");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpdateComPage');
  }
  submit(){
    let json_data:any=[];
    json_data={'update_section':'PROFILE', "pincode": "110096","address": "b-164/611,new ashok nagar,new delhi", "co_name": "Tradeinfo",'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    
    this.ApiServiceProvider.update_company_details(json_data).subscribe((res) => {
      console.log(res);
      if(res.SUCCESS){
        this.navCtrl.push(CompanyDetailPage);
      }
      
    }, (error) => {
      console.log(error);
    })
  }

}
