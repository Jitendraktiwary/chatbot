import { Component,ViewChild } from '@angular/core';
import { AlertController,LoadingController,IonicPage, NavController, NavParams,ViewController,Platform,Navbar  } from 'ionic-angular';
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
 ishome:any='1';
 @ViewChild(Navbar) navBar: Navbar;
  constructor(public platform: Platform,public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,private loadingController: LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.company = this.navParams.get('comp_name');
    this.busnesstype = this.navParams.get('bussness_type');
    this.address = this.navParams.get('address');
    if(this.navParams.get('home')){
      this.ishome = this.navParams.get('home');
    }
    if(this.name == '' || this.name == undefined ){
      this.name = localStorage.getItem('name');
    }
    if(this.company == '' || this.company == undefined ){
      this.name = localStorage.getItem('co_name');
    }

    // if(this.company == '' || this.company == undefined ){
    //   this.name = localStorage.getItem('co_name');
    // }
   // this.subdomain = this.navParams.get('sub_domain');
   platform.registerBackButtonAction(() => {
    this.navCtrl.setRoot(DashboardPage);
  });
  }

  
  ionViewDidLoad() {
    this.navBar.backButtonClick = (e:UIEvent)=>{
     // todo something
     this.navCtrl.setRoot(DashboardPage);
    }
  }
  goback(val){

    if(val == 'product'){
      this.navCtrl.push(PdpPage);
    }else if(val == 'home'){

      let json_data = {'subdomain':'www.tradeindia.com/'+this.subdomain};
      this.viewCtrl.dismiss(json_data);
      // this.navCtrl.setRoot(DashboardPage);
    }   
    else if(val == 'Dashborad'){
      this.navCtrl.setRoot(DashboardPage);
    }else{
      this.navCtrl.push(UpdateComPage);
    }
    
  }
  getsubdomaininfo(){
    // let json_data = {'is_login':'1'};
    // this.viewCtrl.dismiss(json_data);
    this.subdomainfo=0;

    if(this.sugessstedsubdomain == '' || this.sugessstedsubdomain == undefined){
      this.subdomain=this.subdomain; 
    }else{
      this.subdomain=this.sugessstedsubdomain;
    }
    let json_data:any=[];
    json_data={'sub_domain':this.subdomain,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    console.log(json_data);
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
