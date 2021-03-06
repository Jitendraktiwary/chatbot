import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, AlertController, LoadingController, normalizeURL, Platform, ToastController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-product',
  templateUrl: 'add-product.html',
})
export class AddProductPage {
  imgData:any = 'assets/imgs/add-img.png';
  base64image:any;
  product_name:any;
  product_desc:any;
  price:any;
  moq:any;
  file_name_final:any;
  certificate_img:any;
  certificate_base64:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,private base64: Base64,
              public actionsheetCtrl: ActionSheetController,private crop: Crop,private camera: Camera,
              private alertCtrl: AlertController,public loadingCtrl: LoadingController,
              private FileChooser: FileChooser,public platform:Platform,private filePath: FilePath,
              public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddProductPage');
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

  postProduct(){
    if(this.product_name == undefined){
      let alrt = this.alertCtrl.create({
        title: 'Product Name',
        subTitle: 'Product Name is mandatary.',
        cssClass: 'alert-popup',
        buttons: ['OK']
      })
      alrt.present();
      return false;
    }else if(this.product_desc == undefined){
      let alrt = this.alertCtrl.create({
        title: 'Product Description',
        subTitle: 'Product Description is mandatary.',
        cssClass: 'alert-popup',
        buttons: ['OK']
      })
      alrt.present();
      return false;
    }else if(this.price == undefined){
      let alrt = this.alertCtrl.create({
        title: 'Price',
        subTitle: 'Price is mandatary.',
        cssClass: 'alert-popup',
        buttons: ['OK']
      })
      alrt.present();
      return false;
    }else if(this.moq == undefined){
      let alrt = this.alertCtrl.create({
        title: 'Minimum Order Quantity',
        subTitle: 'Minimum Order Quantity is mandatary.',
        cssClass: 'alert-popup',
        buttons: ['OK']
      })
      alrt.present();
      return false;
    }else if(this.imgData == 'assets/imgs/add-img.png'){
      let alrt = this.alertCtrl.create({
        title: 'Product Image',
        subTitle: 'Product Image is mandatary.',
        cssClass: 'alert-popup',
        buttons: ['OK']
      })
      alrt.present();
      return false;
    }else{
      let loader = this.loadingCtrl.create();
      loader.present();
      let json_data = {
        product_name: this.product_name,
        product_desc: this.product_desc,
        price:this.price,
        minimum_order_quantity:this.moq,
        image_data: this.base64image,
        image_file_name: this.imgData.substr(this.imgData.lastIndexOf('?') + 1),// + this.imgData.substr(this.imgData.lastIndexOf('.')),
        image_type: 'jpg',
        cert_img: this.certificate_base64,
        cert_name: this.file_name_final
      };
      alert('API hit...see params in log');
      console.log(json_data);
      // this.ApiServiceProvider.postProductFPU(json_data).subscribe(res => {
      //   if(res.STATUS == 0){
      //     loader.dismiss();
      //     let alrt = this.alertCtrl.create({
      //       title: 'SFA',
      //       subTitle: res.SUCCESS.MESSAGE,
      //       cssClass: 'alert-popup',
      //       buttons: [{
      //         text:'OK',
      //         handler: () => {
      //           this.navCtrl.pop();
      //         }
      //       }]
      //     })
          
      //     alrt.present();
      //   }
      // },
      // err => {
      //     loader.dismiss();
      //     console.log(err);
      //     let alrt = this.alertCtrl.create({
      //       title: 'SFA',
      //       subTitle: 'Error in uploading Featured Product',
      //       cssClass: 'alert-popup',
      //       buttons: [{
      //         text:'OK',
      //         handler: () =>{
      //           this.navCtrl.pop();//go TO VERIFY for upload page
      //         }
      //       }],
      //     })
      //     alrt.present();
      //     return false;
      // });
      loader.dismiss();
    }
  }

  selectFile(){
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
                      this.certificate_img = imageData;
                      this.base64.encodeFile(imageData).then((base64File: string) => {
                        
                        let arr = base64File.split('base64,');
                        this.certificate_base64 = arr[1];
                        console.log(this.certificate_img);
                        this.file_name_final = this.certificate_img.match(/[\w-?]+.(jpe?g|png|pdf)/)[0];
                      }, (err) => {
                        console.log('Error in converting to base64');
                        console.log(err);
                      });
                    }, (err) => {
                      console.log('Error in getting image');
                      console.log(err);
                    });
        }
    },
    {
      text: 'Select from gallery',
      icon: 'md-images',
      handler: () => {


          this.FileChooser.open()
           .then((uri) => {
           this.filePath.resolveNativePath(uri)
          .then((filePath) =>
            {
              console.log(filePath);
              filePath = normalizeURL(filePath);
              console.log('normalize>>>' , filePath);
              this.certificate_img = filePath;
              this.base64.encodeFile(filePath).then((base64File: string) => {
                let arr = base64File.split('base64,');
                this.certificate_base64 = arr[1];
                console.log(this.certificate_img);
                this.file_name_final = this.certificate_img.match(/[\w-?]+.(jpe?g|png|pdf)/)[0];
              }, (err) => {
                console.log('Error in converting to base64');
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

  clear_img()
  {
    this.certificate_img = '';
    this.certificate_base64 = '';
    this.file_name_final = '';
  }

}
