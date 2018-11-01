import { Component } from '@angular/core';
import { LoadingController,ToastController,IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController, normalizeURL,Platform } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

declare var cordova: any;
/**
 * Generated class for the CompextraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-compextra',
  templateUrl: 'compextra.html',
})
export class CompextraPage {
  showdiv:any='one';
  is_image:any=0;
  is_certi:any=0;
  desc:any;
  Noofemp:any;
  turnover:any;
  imgData:any = 'assets/imgs/add-img.png';
  imgCertificate:any = 'assets/imgs/add-img.png';
  base64image:any;
  compImage:any;
  compCertif:any;
  oldcomiomg:any;
  oldcertifany:any;
  annual_currency:any=0;
  annual_mult:any=0;
  file_name:any;
  certimg_type:any='jpg';
  certimg_type_name:any;
  constructor(public platform:Platform,private FileChooser: FileChooser,
    private filePath: FilePath,private loadingController: LoadingController,private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,private base64: Base64,public actionsheetCtrl: ActionSheetController,private crop: Crop,private camera: Camera,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompextraPage');
  }
  show(val){
  
    if(val == 'two'){
      if(this.desc == undefined){
          let toast = this.toastCtrl.create({
          message: 'Please enter Description',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        }else if(this.Noofemp == undefined){
          let toast = this.toastCtrl.create({
            message: 'Please enter No of employee',
            duration: 3000,
            position: 'top'
          });
          toast.present();
        
      }else if(this.turnover == undefined){

        let toast = this.toastCtrl.create({
          message: 'Please enter Turn over',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        
      }else if(this.annual_currency == undefined){

        let toast = this.toastCtrl.create({
          message: 'Please select currency',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        
      }else if(this.annual_mult == undefined){
        let toast = this.toastCtrl.create({
          message: 'Please select "annual turn over in',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        
      }else{
        this.showdiv=val;
      }   
   }else{
    //this.showdiv=val;
    let json_data:any=[];
        json_data={'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id'),'co_info':this.desc,
        'staff':this.Noofemp,'turnover':this.turnover,'annual_mult':this.annual_mult,'annual_currency':this.annual_currency};
        
        if(this.oldcertifany != this.imgData){
          if( this.compImage){
            json_data.img_file_name='comp_pic';
            json_data.img_data=this.compImage;
            json_data.img_type='jpg'
          }
        }
        if(this.oldcomiomg != this.imgCertificate){
          if( this.compCertif){
            json_data.certimg_file_name='certificate';
            json_data.certimg_data=this.compCertif;
            json_data.certimg_type=this.certimg_type;
          }
        }
          let loader = this.loadingController.create({
            content: "Loading, Please wait"
          }); 
          loader.present();
  
       
          this.ApiServiceProvider.extra_details(json_data).subscribe((res) => {
           
           if(res.SUCCESS){
            let toast = this.toastCtrl.create({
              message: 'Company Add/update successfully',
              duration: 3000,
              position: 'top'
            });
            toast.present();
            loader.dismiss();
            this.viewCtrl.dismiss(json_data);
            }else{
              loader.dismiss();
            let toast = this.toastCtrl.create({
              message: 'Company Add/update Successfully',
              duration: 3000,
              position: 'top'
            });
            toast.present();
           }
          }, (error) => {
            loader.dismiss();
            console.log(error);
          })
   }
  }
   back(){
     
     
  }
  ChooseOption2(){
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
                        this.is_image=1;
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
           
          this.crop.crop(imageData, {quality: 100, targetWidth: -1, targetHeight: -1 })
          .then(
            newImage => {
              this.imgData = normalizeURL(newImage);
              this.base64.encodeFile(newImage).then((base64File: string) => {
                console.log(base64File);
                let arr = base64File.split('base64,');
                this.compImage = arr[1];
                this.is_image=1;
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
                      this.imgCertificate = imageData;
                    
                      this.imgCertificate = this.imgCertificate.split('cache/');
                      this.imgCertificate = this.imgCertificate[1].split('?');
                
                      this.certimg_type_name=this.imgCertificate[0];
                      this.imgCertificate = imageData;
                      this.certimg_type='jpg';
                      this.base64.encodeFile(imageData).then((base64File: string) => {
                        
                        let arr = base64File.split('base64,');
                        this.compCertif = arr[1];
                       
                        this.is_certi=1;

                        
                      }, (err) => {
                        console.log(err);
                      });
                      
                    }, (err) => {
                      
                        });
        }
    },
    {
      text: 'Select from Directory',
      icon: 'md-images',
      handler: () => {
          this.platform.ready().then(() => {
          var permissions = cordova.plugins.permissions;

          permissions.hasPermission(permissions.READ_EXTERNAL_STORAGE, checkPermissionCallback, null);
          let alertmsg = this.toastCtrl.create({
            message:'Please allow the READ_EXTERNAL_STORAGE permission',
            duration:4000
          })

          function checkPermissionCallback(status) {
            if(!status.hasPermission) {
              var errorCallback = function() {
            
                alertmsg.present();
              }
              permissions.requestPermission(permissions.READ_EXTERNAL_STORAGE,function(status) {
                if(!status.hasPermission) {
                  errorCallback();
                }
              },
              errorCallback);                   

            }
          }
        });

        this.FileChooser.open()
            .then((uri) => { console.log(uri)
             
              this.filePath.resolveNativePath(uri)
              .then((filePath) =>
              {
                
              
               
                this.file_name =  filePath.split('/');
                
                 this.imgCertificate = normalizeURL(filePath);
                 this.certimg_type=this.file_name[this.file_name.length-1];
                 this.certimg_type_name=this.file_name[this.file_name.length-1];
                 this.certimg_type =  this.certimg_type.split('.');
                 this.certimg_type =  this.certimg_type[1];
                this.base64.encodeFile(filePath).then((base64File: string) => {
              
                let arr = base64File.split('base64,');
                this.compCertif = arr[1];
                this.is_certi=1;
              }, (err) => {
                        console.log(err);
                      });
              }

              )
              .catch(err => console.log(err));

            }
            )
            .catch(e => console.log(e));                

          }

      }

      
    

    ]
    });
    actionSheet.present();
  }
  clearOption(val){
    if(val == 1){
      this.compCertif='';
      this.imgCertificate ='';
     this.certimg_type='jpg';
     this.is_certi=0;
                
    }else{
      this.imgData='';
      this.is_image=0;
      
    }

  }
}
