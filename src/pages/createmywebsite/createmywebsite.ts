import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

import { LoginPage } from '../login/login';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the CreatemywebsitePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-createmywebsite',
  templateUrl: 'createmywebsite.html',
})
export class CreatemywebsitePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatemywebsitePage');
  }
  gotoHome(){
    this.navCtrl.push(HomePage);
    
  }

 
  gotoDashboard(){
    let userid =localStorage.getItem('userid');
   
    if(userid == undefined ||  userid == '' || userid == null){
      this.navCtrl.push(LoginPage);
    }else{
      this.navCtrl.setRoot(DashboardPage);
    }
   
  }
 
}
