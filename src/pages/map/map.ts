import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Platform } from 'ionic-angular/platform/platform';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

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
  // map:any;
  // marker:any;
  @ViewChild('map') mapElement: ElementRef;
  initial_lat:any;
  initial_lng:any;
  pincode:any;

  constructor(private ApiServiceProvider: ApiServiceProvider,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams,public platform: Platform) {
    console.log(this.navParams);
    this.pincode = this.navParams.get('pincode');
    platform.ready().then(() => {
      console.log('platform ready');
      this.ApiServiceProvider.get_loc_pincode(this.pincode).subscribe((res) => {
        console.log(res);
        console.log(res.status);
        if(res.status == 'OK'){
          this.initial_lat = res.results[0].geometry.location.lat;
          this.initial_lng = res.results[0].geometry.location.lng;
        }else{
          this.initial_lat = 28.520396599999998;
          this.initial_lng = 77.2804617;
        }
        this.initMap();
      });
    });
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

  save_location(){
    let user_location = {'lat' : localStorage.getItem('client_lat'),'lng':localStorage.getItem('client_lng')};
    console.log('user_loc=',user_location);
    this.viewCtrl.dismiss(user_location);
  }

}
