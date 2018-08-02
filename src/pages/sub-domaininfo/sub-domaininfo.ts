import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.name = this.navParams.get('name');
    this.company = this.navParams.get('comp_name');
    this.busnesstype = this.navParams.get('bussness_type');
    this.address = this.navParams.get('address');
    this.subdomain = this.navParams.get('sub_domain');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubDomaininfoPage');
  }

}
