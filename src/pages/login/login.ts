import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DashboardPage } from '../dashboard/dashboard';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  show_otp:any = 0;
  mobile:any;
  otp:any;
  otp_count:number = 0;
  userid:any;
  newuser:any;
  constructor(private ApiServiceProvider: ApiServiceProvider,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
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
          this.newuser=res.SUCCESS.new_user;
          localStorage.setItem('new_user',res.SUCCESS.new_user);
          if(this.newuser == 2){
            this.navCtrl.push(HomePage);
          }else{
            this.otp_count++;
            this.show_otp = 1;
            localStorage.setItem('userid',res.SUCCESS.userid);
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
      json_data = {
        "mobile_no": '91'+this.mobile.trim(),
        "userid":this.userid.trim(),
        "otp":this.otp.trim(),
       
        }
    this.ApiServiceProvider.otp_verify(json_data).subscribe((res) => {
      if(res.STATUS == 0 || res['STATUS'] == 0){
        if(res.SUCCESS.auth_token){
          localStorage.setItem('AUTH_TOKEN',res.SUCCESS.auth_token);
          this.navCtrl.setRoot(DashboardPage);
        }else{
          this.navCtrl.push(HomePage);
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
