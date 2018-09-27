
import { Component } from '@angular/core';
import { LoadingController,normalizeURL,ToastController,IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { Camera } from '@ionic-native/camera';
import { PdplistPage } from '../pdplist/pdplist';
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
  imgData:any='assets/imgs/add-img.png';
  compImage:any
  desc:any;
  price:any;
  moq:any;
  imagename:any;
  fp_product_id:any;
  old_image:any;
  constructor(private loadingController: LoadingController,private crop: Crop,private camera: Camera,private base64: Base64,private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,public actionsheetCtrl: ActionSheetController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
     if(this.navParams.get('fp_product_id')){
      this.fp_product_id=this.navParams.get('fp_product_id');
      this.getProductDetail(this.fp_product_id);
      
     }
    
 
  }

  ionViewDidLoad() {
  
  }
  getcategory(){
    let json_data:any=[];
     json_data={'product_name':this.product_name,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
      
    this.ApiServiceProvider.add_category_dd(json_data).subscribe((res) => {
   
      if(res.SUCCESS){
        if(res.SUCCESS.related_cat_list){
          this.showdiv=1;
          this.category=[];
          for(let i in res.SUCCESS.related_cat_list)
            { 
                       
              this.category.push({value:i ,option:res.SUCCESS.related_cat_list[i]});
              
             }
            
        }
      }
     else{
        this.showdiv=0;
        let alert = this.alertCtrl.create({
          title:'OTP',
          message:res.ERROR,
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
    if(this.catvalue == '' ||  this.catvalue == undefined){
        
      let alert = this.alertCtrl.create({
            title:'Category',
            message:'Please select category',
            buttons:['Ok']
          });
          alert.present();


    }else{
      this.showdiv=2;
    }
    
  }
  back(){
    this.showdiv=0;
  }
  submit(){
    if(this.catvalue == '' ||  this.catvalue == undefined){
      let alert = this.alertCtrl.create({
        title:'Category',
        message:'Please select category',
        buttons:['Ok']
      });
      alert.present();
      }else if(this.desc == '' || this.desc == undefined){
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
    }else if(this.compImage == '' || this.compImage == undefined){
      let alert = this.alertCtrl.create({
        title:'MOQ',
        message:'Please select Image.',
        buttons:['Ok']
      });
      alert.present();
     } else if(this.moq == '' || this.moq == undefined){
        let alert = this.alertCtrl.create({
          title:'MOQ',
          message:'Please enter minmum order qunatity',
          buttons:['Ok']
        });
        alert.present();
      }
    else{
      let json_data:any=[];
      json_data={'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id'),
      'product_name':this.product_name,
      'product_desc':this.desc,
      'category_id':this.catvalue,
       'min_quan':this.moq,
      'price_information':this.price,
    
      };

      if(this.old_image != this.imgData){
        json_data.image_type='jpeg';
        json_data.image_data=this.compImage;

      }
      if(this.navParams.get('fp_product_id')){
        json_data.fp_id=this.fp_product_id;
        json_data.action='Edit';
      }
      
     
        let loader = this.loadingController.create({
          content: "Loading, Please wait"
        }); 
        loader.present();
    
        this.ApiServiceProvider.add_edit_featured_product(json_data).subscribe((res) => {
         
         if(res.SUCCESS){
          loader.dismiss();
          this.showdiv =3;
          
          }else{
           
         }
        }, (error) => {
          loader.dismiss();
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
  addmore(){
    this.product_name='';
    this.showdiv =0;
  }
  viewlist(){
    this.navCtrl.push(PdplistPage);
  }
  getProductDetail(fp_product_id){
    
    let json_data:any=[];
    json_data={'fp_product_id':fp_product_id,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
     
   this.ApiServiceProvider.featured_product_details(json_data).subscribe((res) => {
   
     if(res.SUCCESS){
       if(res.SUCCESS.product_details){
         this.showdiv=2;
         this.product_name=res.SUCCESS.product_details.product_name;
         this.price=res.SUCCESS.product_details.price_information;
         this.moq=res.SUCCESS.product_details.min_quan;
         this.imgData=res.SUCCESS.product_details.image_path;
         this.compImage=res.SUCCESS.product_details.image_path;
         this.old_image=res.SUCCESS.product_details.image_path;
         this.desc=res.SUCCESS.product_details.product_descr;
         this.catvalue=res.SUCCESS.product_details.category_id;
         this.category=[];
         for(let i in res.SUCCESS.product_details.related_cat_list)
           { 
                      
             this.category.push({value:i ,option:res.SUCCESS.product_details.related_cat_list[i]});
             
              
             
            }
       }
     }
    else{
       this.showdiv=0;
       let alert = this.alertCtrl.create({
         title:'OTP',
         message:res.ERROR,
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

  eventHandler_code(code)
  {         
     if(code == 13)
      {
        if(this.showdiv == 0 ){
          this.getcategory();   
        }else{
          this.submit();   
        }
            
      }   

  }

}
