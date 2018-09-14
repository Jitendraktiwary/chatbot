
import { Component } from '@angular/core';
import { normalizeURL,ToastController,IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
/**
 * Generated class for the PdpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdp',
  templateUrl: 'pdp.html',
})
export class PdpPage {

  showdiv:any=0;
  product_name:any;
  category:any;
  catvalue:any;
  imgData:any;
  compImage:any
  constructor(private crop: Crop,private camera: Camera,private base64: Base64,private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,public actionsheetCtrl: ActionSheetController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PdpPage');
  }
  getcategory(){
    let json_data:any=[];
     json_data={'product_name':this.product_name,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
      
    this.ApiServiceProvider.add_category_dd(json_data).subscribe((res) => {
      console.log(res);
      if(res.SUCCESS.category_list){
        this.showdiv=1;
        this.category=[];
        for(let i in res.SUCCESS.category_list)
          { 
          console.log(i);
          console.log(res.SUCCESS.category_list[i]);
            
            this.category.push({value:i ,option:res.SUCCESS.category_list[i]});
            
             
            
           }
           console.log(this.category);
      }else{
        this.showdiv=0;
        let alert = this.alertCtrl.create({
          title:'OTP',
          message:res.SUCCESS.MESSAGE,
          buttons: ['Ok']
        });
        alert.present();
      }
      
    }, (error) => {
      this.showdiv=0;
      let alert = this.alertCtrl.create({
        title:'OTP',
        message:error,
        buttons: ['Ok']
      });
      alert.present();
      console.log(error);
    })
  }
  next(){
    this.showdiv=2;
  }
  back(){
    this.showdiv=0;
  }
  submit(){

  }

  ChooseOption(){
    alert("ok");
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
                        this.compImage = arr[1];
                        
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
                this.compImage = arr[1];
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
