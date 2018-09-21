import { Component } from '@angular/core';
import { AlertController,LoadingController,IonicPage, NavController, NavParams,ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { PdpPage } from '../pdp/pdp';
import { UpdateComPage } from '../update-com/update-com';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the SubDomaininfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sub-domaininfo',
  templateUrl: 'sub-domaininfo.html',
})
export class SubDomaininfoPage {
 name:any;
 company:any;
 busnesstype:any;
 address:any;
 subdomain:any;
 showdiv:any=0;
 sugessstedsubdomain:any;
 subdomainfo:any=0;
 category:any;
 sugestmsg:any;
  constructor(public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,private loadingController: LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.company = this.navParams.get('comp_name');
    this.busnesstype = this.navParams.get('bussness_type');
    this.address = this.navParams.get('address');
   // this.subdomain = this.navParams.get('sub_domain');
  }

  ionViewDidLoad() {
   
  }
  goback(val){

    if(val == 'product'){
      this.navCtrl.push(PdpPage);
    }else if('Dashborad'){
      this.navCtrl.setRoot(DashboardPage);
    }else{
      this.navCtrl.push(UpdateComPage);
    }
    
  }
  getsubdomaininfo(){
    this.subdomainfo=0;
    let json_data:any=[];
    json_data={'sub_domain':this.subdomain,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    let loader = this.loadingController.create({
      content: "Loading, Please wait"
    }); 
    loader.present();
   this.ApiServiceProvider.create_domain(json_data).subscribe((res) => {
    loader.dismiss();
    
     if(res.SUCCESS){
   
      if(res.SUCCESS.suggestions){
        this.subdomainfo=1;
        this.sugestmsg=res.SUCCESS.MESSAGE;
        this.showdiv=0;
        this.category=[];
        for(let i in res.SUCCESS.suggestions)
          { 
            this.category.push({value:res.SUCCESS.suggestions[i] ,option:res.SUCCESS.suggestions[i]});
            
          }

      }else{
        this.showdiv=1;
      }
     
     }
    else{
       this.showdiv=0;
       let alert = this.alertCtrl.create({
         title:'OTP',
         message:res.ERROR,
         buttons: ['Ok']
       });
       alert.present();
     }
     
   }, (error) => {
    loader.dismiss();
     this.showdiv=0;
     let alert = this.alertCtrl.create({
       title:'OTP',
       message:error,
       buttons: ['Ok']
     });
     alert.present();
     console.log(error);
   })
  }
}
