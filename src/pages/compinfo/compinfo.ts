import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController, normalizeURL } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
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
  imgData:any = 'assets/imgs/add-img.png';
  base64image:any;
  constructor(private base64: Base64,public actionsheetCtrl: ActionSheetController,private crop: Crop,private camera: Camera,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
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

  ChooseOption(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Select File',
      cssClass: 'action-sheets-basic-page',
      buttons: [
      {
        text: 'Open camera',
        icon: 'md-camera',

        handler: () => {

                    var options = {
                      quality: 50,
                      destinationType: this.camera.DestinationType.FILE_URI,
                      sourceType: this.camera.PictureSourceType.CAMERA,
                      allowEdit: true,
                      encodingType: this.camera.EncodingType.JPEG,
                      saveToPhotoAlbum: false,
                      correctOrientation: true,
                      targetWidth: 720,
                      targetHeight: 720,
                    };
                    this.camera.getPicture(options).then((imageData) => {
                      imageData = normalizeURL(imageData);
                      this.imgData = imageData;
                      this.base64.encodeFile(imageData).then((base64File: string) => {
                        
                        let arr = base64File.split('base64,');
                        this.base64image = arr[1];
                      }, (err) => {
                        console.log(err);
                      });
                      
                    }, (err) => {
                      
                        });
        }
    },
    {
      text: 'Select from gallery',
      icon: 'md-images',
      handler: () => {
        var options = {
          quality: 50,
          destinationType: this.camera.DestinationType.FILE_URI,
          sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
          allowEdit: true,
          encodingType: this.camera.EncodingType.JPEG,
          saveToPhotoAlbum: false,
          correctOrientation: true,
          targetWidth: 720,
          targetHeight: 720,
        };
        this.camera.getPicture(options).then((imageData) => {
          console.log(imageData);
          
          this.crop.crop(imageData, {quality: 100, targetWidth: -1, targetHeight: -1 })
          .then(
            newImage => {
              this.imgData = normalizeURL(newImage);
              this.base64.encodeFile(newImage).then((base64File: string) => {
                console.log(base64File);
                let arr = base64File.split('base64,');
                this.base64image = arr[1];
              }, (err) => {
                console.log(err);
              });
            },
            error => console.error('Error cropping image', error)
          );
          
        }, (err) => {
          
            });
      }
    }

    ]
    });
    actionSheet.present();
  }

}
