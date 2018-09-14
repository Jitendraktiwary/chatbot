import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { CompanyDetailPage } from '../company-detail/company-detail';
/**
 * Generated class for the UpadteProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upadte-profile',
  templateUrl: 'upadte-profile.html',
})
export class UpadteProfilePage {
  name:any;
  email:any;
  mobile:any;

  constructor(private ApiServiceProvider: ApiServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.name=this.navParams.get("name");
    this.email=this.navParams.get("email");
    this.mobile=this.navParams.get("mobile");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UpadteProfilePage');
  }
  submit(){
    let json_data:any=[];
    json_data={'update_section':'USER', "email": "extra_emial@gmail.com","mobile_no": "+918750320312", "username": "Jitendra kumar Tiwary",'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    
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
