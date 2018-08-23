import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { CreatemywebsitePage } from '../pages/createmywebsite/createmywebsite';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = CreatemywebsitePage;

  constructor(private device: Device,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.fcm.subscribeToTopic('marketing');

        this.fcm.getToken().then(token => {
          console.log(">>>>>>>>>>>>>"+token);
          localStorage.setItem('MODEL',this.device.model);
          localStorage.setItem('DEVICE_ID',this.device.uuid);
          localStorage.setItem('OS-TYPE',this.device.platform);
          localStorage.setItem('OS-VERSION',this.device.version);
          localStorage.setItem('PUSH-TOKEN',token);
        });

        this.fcm.onNotification().subscribe(data => {
          if(data.wasTapped){
            console.log("Received in background");
          } else {
            console.log("Received in foreground");
          };
        });

    });
  }
}

