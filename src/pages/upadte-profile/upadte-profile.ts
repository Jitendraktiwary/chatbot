import { Component } from '@angular/core';
import { LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { DashboardPage } from '../dashboard/dashboard';
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

  constructor(private loadingController: LoadingController,private ApiServiceProvider: ApiServiceProvider,public navCtrl: NavController, public navParams: NavParams) {
    this.name=this.navParams.get("name");
    this.email=this.navParams.get("email");
    this.mobile=this.navParams.get("mobile");
    
  }

  ionViewDidLoad() {
   
  }
  submit(){
    this.mobile="+91"+this.mobile;
    let json_data:any=[];
    json_data={'update_section':'USER', "email": this.email,"mobile_no": this.mobile, "username": this.name,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    let loader = this.loadingController.create({
      content: "Loading, Please wait"
    }); 
    loader.present();
    this.ApiServiceProvider.update_company_details(json_data).subscribe((res) => {
    
      loader.dismiss()
      if(res.SUCCESS){
        this.navCtrl.push(CompanyDetailPage);
      }
      
    }, (error) => {
      loader.dismiss()
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
  gohome(){
    this.navCtrl.setRoot(DashboardPage);
  }
}
