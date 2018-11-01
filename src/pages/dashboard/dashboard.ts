import { Component } from '@angular/core';
import { LoadingController,Platform,AlertController,IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { PdplistPage } from '../pdplist/pdplist';
import { CreatemywebsitePage } from '../createmywebsite/createmywebsite';
import { AboutusPage } from '../aboutus/aboutus';
 import { TermandconditionPage } from '../termandcondition/termandcondition';
 import { SocialSharing } from '@ionic-native/social-sharing';
 import { SubDomaininfoPage } from '../sub-domaininfo/sub-domaininfo';
 import { InAppBrowser } from '@ionic-native/in-app-browser';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {
 // Basic root for our content view
  rootPage = 'CompanyDetailPage';
  pages = [
    { title: 'Company Detail', pageName: 'CompanyDetailPage', icon: 'logo-buffer' ,icoclor:'catbg-3'},
    { title: 'Products Info', pageName: 'PdplistPage', icon: 'archive' ,icoclor:'catbg-4' },
    { title: 'Rate This App', pageName: 'ratethisapp', icon: 'star' ,icoclor:'catbg-5' },
    { title: 'Share', pageName: 'share', icon: 'share', icoclor:'catbg-0' },
    { title: 'Aboit Us', pageName: 'aboutus', icon: 'information', icoclor:'catbg-0' },
    { title: 'Terms & Condition', pageName: 'termsandcondition', icon: 'document', icoclor:'catbg-0' },
    { title: 'Logout', pageName: 'logout', icon: 'power' ,icoclor:'catbg-1' },
  ];
 username:any;
 mob:any;
 co_name:any;
 percencomp:any=40;
 num_prod:any=0;
 sub_domain:any=0;
 show:any=0;
 showinfom:any=0;
 showinfomvalue:any='';
  constructor(private iab: InAppBrowser,private loadingController: LoadingController,public platform: Platform,private socialSharing: SocialSharing,public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
   this.username=localStorage.getItem('name');
   this.mob=localStorage.getItem('mobile');
   
   this.getStatus()

  }

  ionViewDidLoad() {
   
  }

  openPage(page) {
    
    if(page == 'CompanyDetailPage'){
      this.navCtrl.push(CompanyDetailPage);
    }else if(page == 'PdplistPage'){
      this.navCtrl.push(PdplistPage);
    }else if(page == 'logout'){
          let json_data :any=[]
      json_data = {
        "profile_id": localStorage.getItem('profile_id'),
        "userid":localStorage.getItem('userid'),
         
        }
    this.ApiServiceProvider.logoff(json_data).subscribe((res) => {
     
      }, (error) => {
      console.log(error);
    }) 
     // localStorage.clear();
     localStorage.removeItem('AUTH_TOKEN');
     localStorage.removeItem('userid');
     localStorage.removeItem('profile_id');
     localStorage.removeItem('co_name');
     localStorage.removeItem('email');
     localStorage.removeItem('mobile');
     localStorage.removeItem('name');
     localStorage.removeItem('new_user');
    // localStorage.setItem('AUTH_TOKEN','');
    // localStorage.setItem('userid', '');
    // localStorage.setItem('profile_id', '');
     this.navCtrl.push(CreatemywebsitePage);
     }else if(page == 'termsandcondition'){
      this.navCtrl.push(TermandconditionPage);
    }else if(page == 'aboutus'){
      this.navCtrl.push(AboutusPage);
    }
    else if(page == 'share'){
     this.share();
    }
    else if(page == 'ratethisapp'){
      this.RatethisApp();
     }
    
  }
  goTocomDetail(){
    this.navCtrl.push(CompanyDetailPage);
  }
  getStatus(){
    let json_data :any=[]
    json_data = {
      "profile_id": localStorage.getItem('profile_id'),
      "userid":localStorage.getItem('userid'),
       
      }
      let loader = this.loadingController.create({
        content: "Loading, Please wait"
      }); 
      loader.present();
  this.ApiServiceProvider.profile_status(json_data).subscribe((res) => {
   
    if(res.STATUS == 0 || res['STATUS'] == 0){
     
        if(res.SUCCESS.turnover == 1){
          this.percencomp=this.percencomp+10;
         
        }else{
          this.showinfomvalue="Company Turn Over,";
        }
        if(res.SUCCESS.staff == 1){
          this.percencomp=this.percencomp+10;
         
        }else{
          this.showinfomvalue +="Company Staff,";
        }

        if(res.SUCCESS.co_info == 1){
          this.percencomp=this.percencomp+5;
          
        }else{
          this.showinfomvalue +="Company Description,";
        }

        if(res.SUCCESS.comp_pic == 1){
          this.percencomp=this.percencomp+5;
          
        }else{
          this.showinfomvalue +="Company Image,";
        }

        if(res.SUCCESS.certificate == 1){
          this.percencomp=this.percencomp+5;
         
        }else{
          this.showinfomvalue +="Company Certificate,";
        }

        if(res.SUCCESS.upload_products != 0){
          this.percencomp=this.percencomp+10;
          
        }else{
          this.showinfomvalue +="No Producs uploaded,";
        }

        if(res.SUCCESS.domain_name){
          if(res.SUCCESS.domain_name != 0){
            this.percencomp=this.percencomp+15;
            this.sub_domain=res.SUCCESS.domain_name;
          }else{
            this.showinfomvalue +="Create Sub Domain.";
          }
          
        }else{
          this.sub_domain=0;
          this.showinfomvalue +="Create Sub Domain.";
        }
          this.num_prod=res.SUCCESS.upload_products;
         localStorage.setItem('co_name',res.SUCCESS.co_name);
         this.co_name=res.SUCCESS.co_name;
     
         this.show=1;
         if(this.percencomp == 100){
            this.showinfom=0;
         }else{
          this.showinfom=1;
         }
         this.showinfomvalue +=".These are missing,please complete your profile."
      
    }else{
      let alert = this.alertCtrl.create({
        title:'Dashboard ',
        message:'your session expired ! please login again.',
        buttons: ['Ok']
      });
      alert.present();
    }
    loader.dismiss();
    }, (error) => {
      loader.dismiss();
    console.log(error);
  }) 
  }
  goToproductlist(){
    this.navCtrl.push(PdplistPage);
  }
  share(){
    let subject = 'https://tiimg.tistatic.com/new_website1/download-app/download-app-banner.jpg';
    let url='';
        let msg = '';
        if(this.platform.is('ios')){
           url = 'https://www.tradeindia.com/ctiny/u86k54';
         
        }else{
          url = 'https://www.tradeindia.com/ctiny/zh9122';
         }
        
         msg = "Download Tradeindia App.\n Earn 300 reward points. \n";
    this.socialSharing.share(msg, subject, "", url).
    then(() => {
      // Success!
    }).catch(() => {
      // Error!
    });
  }

  RatethisApp(){
    if(this.platform.is('ios')){
      window.open('https://www.tradeindia.com/ctiny/u86k54', '_system', 'location=no'); //ios
    }else{
      window.open('https://www.tradeindia.com/ctiny/zh9122', '_system', 'location=no'); //android
    }
  }
  goTodomain(val){
    if(val == 'URL'){
     // window.open('https://www.tradeindia.com/'+this.sub_domain, '_system');
       this.iab.create('https://www.tradeindia.com/'+this.sub_domain,'_blank','location=no');
    }else{
      this.navCtrl.push(SubDomaininfoPage,{homevalue:1});
    }
    
  }
  showinfo(){
    const alert = this.alertCtrl.create({
      title: 'Information!',
      message:this.showinfomvalue,
      buttons: ['OK']
    });
    alert.present();
  

  }
}
