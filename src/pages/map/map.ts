import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { DashboardPage } from '../dashboard/dashboard';
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  show_map:number = 0;
  // button_type:number = 0;
  show_otp:boolean=false;
  show_details:boolean=false;
  show_enter_details:boolean=true;
  otp_count:number = 0;
  // map:any;
  // marker:any;
  @ViewChild('map') mapElement: ElementRef;
  initial_lat:any;
  initial_lng:any;
  pincode:any;
  mobile:any;
  email:any;
  flat:any;
  locality:any;
  otp:any;
  userid:any
  newuser:any;
  constructor(public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
    
  }

  initMap(){
    var myLatlng = new google.maps.LatLng(this.initial_lat,this.initial_lng);
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 12,
      center: myLatlng    //{lat: 28.520396599999998, lng: 77.2804617}
    });
    var marker = new google.maps.Marker({
      position: myLatlng,   //{lat: 28.520396599999998, lng: 77.2804617},
      map: map,
      // icon: image
    });
    google.maps.event.addListener(map, 'center_changed', () => {
      // 0.1 seconds after the center of the map has changed,
      // set back the marker position.
      window.setTimeout(function() {
        var center = map.getCenter();
        localStorage.setItem('client_lat',center.lat());
        localStorage.setItem('client_lng',center.lng());
        marker.setPosition(center);
      }, 100);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  save_location(with_loc){
    let json_data = {'pincode':this.pincode,'mobile':this.mobile,'email':this.email,'flat':this.flat};
    if(with_loc == 'send_loc'){
      let user_location = {'lat' : localStorage.getItem('client_lat'),'lng':localStorage.getItem('client_lng')};
      json_data['userlocation'] = user_location;
    }
    this.viewCtrl.dismiss(json_data);
  }

  send_otp(){
    console.log("this.show_map"+this.show_map);
    let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
    }else if(this.email == undefined){
      let alert = this.alertCtrl.create({
        title:'Email',
        message:'Please enter Email Id',
        buttons:['Ok']
      });
      alert.present();
    }else if(!email_regex.test(this.email)){
      let alert = this.alertCtrl.create({
        title:'Email',
        message:'Please enter Email Id in correct format',
        buttons:['Ok']
      });
      alert.present();
    }else if(this.flat == undefined){
      let alert = this.alertCtrl.create({
        title:'Address',
        message:'Please enter Address',
        buttons:['Ok']
      });
      alert.present();
    }else if(this.pincode == undefined){
      let alert = this.alertCtrl.create({
        title:'Pincode',
        message:'Please enter Pincode',
        buttons:['Ok']
      });
      alert.present();
    }else if(this.pincode.length != 6){
      let alert = this.alertCtrl.create({
        title:'Pincode',
        message:'Pincode length should be 6.',
        buttons:['Ok']
      });
      alert.present();
    }else{
      console.log(this.otp_count);
      this.show_map = 2;
      let json_data :any=[]
      json_data = {
        "mobile_no":this.mobile.trim(),
        "email":this.email.trim(),
        "co_name":this.navParams.get('co_name').trim(),
        "username":this.navParams.get('name').trim(),
        "pincode":this.pincode.trim(),
        "address":this.flat.trim(),
        "latitude":localStorage.getItem('client_lat'),
	      "longitude":localStorage.getItem('client_long')
        }
        localStorage.setItem('username',this.navParams.get('co_name').trim());
        localStorage.setItem('mob',this.mobile.trim());
        console.log(json_data);
        console.log(this.navParams.get('business_type'));
        //let toArray=this.navParams.get('business_type');
        let bussnestype =this.navParams.get('business_type')
        console.log("bussnestype>>>>"+bussnestype);
        for(let i in bussnestype)
        { 
          if(bussnestype[i] == 'Exporter'){
            json_data.ifexporter='1';
          } else if(bussnestype[i] == 'Importer'){
            json_data.ifimporter='1';
          }else if(bussnestype[i] == 'Manufacturer'){
            json_data.ifmanu='1';
          }else if(bussnestype[i] == 'Service'){
            json_data.ifservice='1';
          }else if(bussnestype[i] == 'Distributor'){
            json_data.ifdistributor='1';
          }else if(bussnestype[i] == 'Supplier'){
            json_data.ifsupplier='1';
          }else if(bussnestype[i] == 'Trader'){
            json_data.iftrader='1';
          }          
        }
      if(this.otp_count <= 3){
        this.ApiServiceProvider.check_registration(json_data).subscribe((res) => {
          console.log(res);
          this.otp_count++;
          this.show_otp = true;
          this.show_map = 2;
          localStorage.setItem('userid',res.SUCCESS.userid);
          this.userid=res.SUCCESS.userid;
          this.newuser=res.SUCCESS.new_user
           localStorage.setItem('new_user',res.SUCCESS.new_user);
        }, (error) => {
          console.log(error);
        })
      }else{
        let alert = this.alertCtrl.create({
          title:'Verification Error',
          message:'Please try again after some time.',
          buttons:['Ok']
        });
        alert.present();
      }

    }
    console.log("this.show_map"+this.show_map);

  }

  open_map(){
    this.show_map = 0;
    this.platform.ready().then(() => {
      console.log('platform ready');
      this.ApiServiceProvider.get_loc_pincode(this.pincode).subscribe((res) => {
        console.log(res);
        console.log(res['status']);
        if(res['status'] == 'OK'){
          this.initial_lat = res['results'][0].geometry.location.lat;
          this.initial_lng = res['results'][0].geometry.location.lng;
        }else{
          this.initial_lat = 28.520396599999998;
          this.initial_lng = 77.2804617;
        }
        this.initMap();
      });
    });
   
    console.log("this.show_map"+this.show_map);
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
        "mobile_no":this.mobile.trim(),
        "userid":this.userid.trim(),
        "otp":this.otp.trim(),
       
        }
    this.ApiServiceProvider.otp_verify(json_data).subscribe((res) => {
      if(res.STATUS == 0 || res['STATUS'] == 0){
        localStorage.setItem('AUTH_TOKEN',res.SUCCESS.AUTH_TOKEN);


        if(this.newuser == 1){
          this.show_map = 3;
          this.show_otp = false;
          this.show_enter_details = false;
          this.show_details = true;
        }else{
          this.navCtrl.setRoot(DashboardPage);
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

  edit_address(){
    this.show_map = 0;
    this.show_otp =false;
    this.show_enter_details = true;
    this.otp = undefined;
  }

}
