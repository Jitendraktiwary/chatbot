import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
/**
 * Generated class for the CompinfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compinfo',
  templateUrl: 'compinfo.html',
})
export class CompinfoPage {
  desc:any;
  Noofemp:any;
  turnover:any;
  constructor(public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompinfoPage');
  }
  send_otp(){
     if(this.desc == undefined){
      let alert = this.alertCtrl.create({
        title:'Description',
        message:'Please enter Description',
        buttons:['Ok']
      });
      alert.present();
      }else if(this.Noofemp == undefined){
      let alert = this.alertCtrl.create({
        title:'No of employee',
        message:'Please enter No of employee',
        buttons:['Ok']
      });
      alert.present();
    }else if(this.turnover == undefined){
      let alert = this.alertCtrl.create({
        title:'Turn over',
        message:'Please enter Turn over',
        buttons:['Ok']
      });
      alert.present();
    }else{
      let json_data = {'desc':this.desc,'Noofemp':this.Noofemp,'turnover':this.turnover};
    
      this.viewCtrl.dismiss(json_data);
        // this.ApiServiceProvider.send_otp(this.mobile).subscribe((res) => {
         
        // }, (error) => {
        //   console.log(error);
        // })
      

    }
  

  }

}
