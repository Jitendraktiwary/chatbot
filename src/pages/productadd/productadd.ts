import { Component } from '@angular/core';
import { LoadingController,normalizeURL,ToastController,IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { DashboardPage } from '../dashboard/dashboard';


/**
 * Generated class for the ProductaddPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productadd',
  templateUrl: 'productadd.html',
})
export class ProductaddPage {
  showdiv:any='one';
  imgData:any='assets/imgs/add-img.png';
  headerconten:any='Add Product';
  loadProgress:any=80;
  product_name:any;
  category:any;
  catvalue:any;
  catname:any;
  compImage:any
  desc:any;
  price:any;
  moq:any;
  imagename:any;
  fp_product_id:any;
  old_image:any;
  is_image:any=0;
  showhtmldiv:any=0;
  success:any=0;
  constructor(private loadingController: LoadingController,private crop: Crop,private camera: Camera,private base64: Base64,private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,public actionsheetCtrl: ActionSheetController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductaddPage');
  }
  show(val){
  
   if(val == 'two'){
     if(this.is_image == 1){
      this.showdiv=val;
      this.headerconten='Update Product Details';
     }else{
      let toast = this.toastCtrl.create({
        message: 'please select the image',
        duration: 3000,
        position: 'top'
      });
      toast.present();
     }
    
   }else if(val == 'one')
   {
    this.category=[];
    this.showdiv=val;
    this.is_image=0;
    this.imgData='assets/imgs/add-img.png';
    this.headerconten='Add Product';
   }else if(val == 'three')
   {
        
              this.showdiv=val;
            
      
   }else if(val == 'four')
   {
          if(this.desc == '' || this.desc == undefined){
            let alert = this.alertCtrl.create({
              title:'Discription',
              message:'Please enter discription',
              buttons:['Ok']
            });
            alert.present();
          }else if(this.price == '' || this.price == undefined){
            let alert = this.alertCtrl.create({
              title:'Price',
              message:'Please enter price',
              buttons:['Ok']
            });
            alert.present();
          }else if(this.moq == '' || this.moq == undefined){
              let alert = this.alertCtrl.create({
                title:'MOQ',
                message:'Please enter minmum order qunatity',
                buttons:['Ok']
              });
              alert.present();
            }else{
              this.showdiv=val;
            }
      
   }else{
    let json_data:any=[];
    json_data={'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id'),
    'product_name':this.product_name,
    'product_desc':this.desc,
    'category_id':this.catvalue,
     'min_quan':this.moq,
    'price_information':this.price,
  
    };

     let loader = this.loadingController.create({
        content: "Loading, Please wait"
      }); 
      loader.present();
  
      this.ApiServiceProvider.add_edit_featured_product(json_data).subscribe((res) => {
       
       if(res.SUCCESS){
        loader.dismiss();
           this.success=1;  
           this.showdiv ='final'; 
        }else{
          this.success=0;  
       }
      }, (error) => {
        this.success=0;  
        loader.dismiss();
        let toast = this.toastCtrl.create({
        message: error,
        duration: 3000,
        position: 'top'
      });
      toast.present();
        console.log(error);
      })
    
   }
  
  }

  back(){
    
    if(this.showdiv == 'two'){

      this.showdiv='one';
      this.headerconten='Add Product';
      this.category=[];
      this.is_image=0;
      this.success=0;
    }else if(this.showdiv == 'three')
    {
      this.showdiv='two';
      this.headerconten='Update Product Details';
     }
    else if(this.showdiv == 'four')
    {
      this.showdiv='one';
      this.headerconten='Add Product';
      this.category=[];
      this.is_image=0;
      this.success=0;
    }
    else if(this.showdiv == 'one')
    {
     this.navCtrl.pop();
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

                      this.is_image=1;
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
                this.is_image=1;
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
  getcategory(){
    if(this.product_name == ''){
      let toast = this.toastCtrl.create({
        message: 'please enter product name',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }else{
    let json_data:any=[];
     json_data={'product_name':this.product_name,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
      
    this.ApiServiceProvider.add_category_dd(json_data).subscribe((res) => {
   
      if(res.SUCCESS){
        if(res.SUCCESS.related_cat_list){
          this.showhtmldiv=1;
          this.category=[];
          for(let i in res.SUCCESS.related_cat_list)
            { 
                 let catvalue=res.SUCCESS.related_cat_list[i].split(">>");      
                 this.category.push({value:i ,option:catvalue[catvalue.length-1]});
              
             }
            
        }
      }
     else{
        this.showhtmldiv=0;
        let alert = this.alertCtrl.create({
          title:'OTP',
          message:res.ERROR,
          buttons: ['Ok']
        });
        alert.present();
      }
      
    }, (error) => {
      this.showhtmldiv=0;
      let alert = this.alertCtrl.create({
        title:'OTP',
        message:error,
        buttons: ['Ok']
      });
      alert.present();
      console.log(error);
    })
  }
  }

  gohome(){
    this.navCtrl.setRoot(DashboardPage);
  }
  getCatvalue(id,value){

    this.catvalue =value ;
    this.catname=id;
  }

}
