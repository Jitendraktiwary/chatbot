import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController,ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';

/**
 * Generated class for the BeforeloginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-beforelogin',
  templateUrl: 'beforelogin.html',
})
export class BeforeloginPage {

  show_otp:any = 0;
  mobile:any;
  otp:any= undefined;
  otp_count:number = 0;
  userid:any;
  newuser:any;
  constructor(public viewCtrl: ViewController,private ApiServiceProvider: ApiServiceProvider,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  edit_number(){
    this.show_otp = 0;
    this.otp = undefined;
  }

  send_otp(){
    if(this.mobile == undefined){
      let alert = this.alertCtrl.create({
        title:'Mobile',
        message:'Please enter mobile no',
        buttons:['Ok']
      });
      alert.present();
    }else if(this.mobile.length < 10 || this.mobile.length > 15){
      let alert = this.alertCtrl.create({
        title:'Mobile',
        message:'Invalid Mobile Length',
        buttons:['Ok']
      });
      alert.present();
    }else{
      console.log(this.otp_count);
      let json_data = {
        "mobile_no": '91'+this.mobile.trim()
        }
      if(this.otp_count <= 3){
        this.ApiServiceProvider.check_registration(json_data).subscribe((res) => {
          console.log(res);
          if(res.SUCCESS.new_user){
            this.newuser=res.SUCCESS.new_user;
          }
         
          localStorage.setItem('new_user',res.SUCCESS.new_user);
          if(this.newuser == 0 )
            {
             localStorage.setItem('userid',res.SUCCESS.userid);
            }
          if(this.newuser == 2){
            this.navCtrl.push(HomePage);
          }else{
            this.otp_count++;
            this.show_otp = 1;
                   
            this.userid=res.SUCCESS.userid;
          }
          
          
        }, (error) => {
            let alert = this.alertCtrl.create({
              title:'Error in Sending OTP',
              message:'Please try again after some time.',
              buttons:['Ok']
            });
            alert.present();
        })
      }else{
        let alert = this.alertCtrl.create({
          title:'Verification Error',
          message:'Maximun login attempts reached.',
          buttons:['Ok']
        });
        alert.present();
      }

    }

  }

  verify_otp(){
    if(this.otp == undefined){
      let alert = this.alertCtrl.create({
        title:'OTP',
        message:'Please enter OTP',
        buttons: ['Ok']
      });
      alert.present();
    }else {

      let json_data :any=[]
      let userid:any;
      if(localStorage.getItem('userid')){
        userid=localStorage.getItem('userid');
        json_data = {
          "mobile_no": '91'+this.mobile.trim(),
          "userid":userid,
          "otp":this.otp.trim(),
         
          }
      }else{
        userid='';
        json_data = {
          "mobile_no": '91'+this.mobile.trim(),
          "otp":this.otp.trim(),
          }
      }
     
    this.ApiServiceProvider.otp_verify(json_data).subscribe((res) => {
      console.log(res);
      if(res.STATUS == 0 || res['STATUS'] == 0){
        if(res.SUCCESS.auth_token){
          localStorage.setItem('AUTH_TOKEN',res.SUCCESS.auth_token);
          localStorage.setItem('profile_id',res.SUCCESS.profile_id);
          localStorage.setItem('mobile',res.SUCCESS.mobile_no);
          localStorage.setItem('email',res.SUCCESS.email);
          localStorage.setItem('name',res.SUCCESS.username);
          
          this.navCtrl.setRoot(DashboardPage);
        }else{
          let json_data = {'newuser':this.newuser,'mobile':this.mobile};
          
          this.viewCtrl.dismiss(json_data);
         // this.navCtrl.push(HomePage);
        }
        
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
}
