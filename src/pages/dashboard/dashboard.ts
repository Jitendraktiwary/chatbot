import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,MenuController } from 'ionic-angular';
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
    { title: 'Company Detail', pageName: 'CompanyDetailPage', icon: 'home' },
  ];
 username:any;
 mob:any;
  constructor(public menuCtrl: MenuController,public navCtrl: NavController, public navParams: NavParams) {
   this.username=localStorage.getItem('username');
   this.mob=localStorage.getItem('mob');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
  }

  openPage(page) {
    console.log('opening page',page.pageName);
    this.navCtrl.push(page.pageName); //Pushing SideMenu page
  }

}
