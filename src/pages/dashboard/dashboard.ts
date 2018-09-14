import { Component } from '@angular/core';
import { AlertController,IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
import { CompanyDetailPage } from '../company-detail/company-detail';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

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
    { title: 'Products Info', pageName: 'CompanyDetailPage', icon: 'archive' ,icoclor:'catbg-4' },
    { title: 'Rate This App', pageName: '', icon: 'star' ,icoclor:'catbg-5' },
    { title: 'Share', pageName: '', icon: 'share', icoclor:'catbg-0' },
    { title: 'Aboit Us', pageName: '', icon: 'information', icoclor:'catbg-0' },
    { title: 'Terms & Condition', pageName: '', icon: 'document', icoclor:'catbg-0' },
    { title: 'Logout', pageName: '', icon: 'power' ,icoclor:'catbg-1' },
  ];
 username:any;
 mob:any;
 co_name:any;
 percencomp:any=40;
 num_prod:any=0;
  constructor(public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
   this.username=localStorage.getItem('name');
   this.mob=localStorage.getItem('mobile');
   this.getStatus()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  openPage(page) {
    console.log('opening page',page.pageName);
    this.navCtrl.push(page.pageName); //Pushing SideMenu page
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
  this.ApiServiceProvider.profile_status(json_data).subscribe((res) => {
    console.log(res);
    if(res.STATUS == 0 || res['STATUS'] == 0){
     
        if(res.SUCCESS.turnover == 1){
          this.percencomp=this.percencomp+10;
        }
        if(res.SUCCESS.staff == 1){
          this.percencomp=this.percencomp+10;
        }
        if(res.SUCCESS.co_info == 1){
          this.percencomp=this.percencomp+10;
        }
        if(res.SUCCESS.comp_pic == 1){
          this.percencomp=this.percencomp+10;
        }
        if(res.SUCCESS.certificate == 1){
          this.percencomp=this.percencomp+10;
        }
        if(res.SUCCESS.upload_products != 0){
          this.percencomp=this.percencomp+10;
        }
       this.num_prod=res.SUCCESS.upload_products;
         localStorage.setItem('co_name',res.SUCCESS.co_name);
         this.co_name=res.SUCCESS.co_name;
     
    
      
    }else{
      let alert = this.alertCtrl.create({
        title:'OTP',
        message:'OTP you have entered is invalid',
        buttons: ['Ok']
      });
      alert.present();
    }
    
    }, (error) => {
    console.log(error);
  }) 
  }

}
