import { Component } from '@angular/core';
import { ToastController,LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

import { PdpPage } from '../pdp/pdp';
/**
 * Generated class for the PdplistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pdplist',
  templateUrl: 'pdplist.html',
})
export class PdplistPage {
  pdplist:any=[];
  pagenum:any=1;
  showloadmore:any=1;
  nomoreproduct:any;
  lead_statusoption:any={
    title: 'Tradeindia',
    subTitle: 'category'
};
  constructor(private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,private loadingController: LoadingController,public navCtrl: NavController, public navParams: NavParams) {
    this.getpdplist();
  }

  ionViewDidLoad() {
   
  }
  getpdplist(){
    let loader = this.loadingController.create({
      content: "Loading, Please wait"
    }); 
    loader.present();
    let json_data:any=[];
     json_data={"page_no":this.pagenum,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
      
    this.ApiServiceProvider.featured_product_list(json_data).subscribe((res) => {
      
      loader.dismiss();
      if(res.SUCCESS){
        this.pdplist = res.SUCCESS.FP_LIST;
        if(res.SUCCESS.FP_LIST.length < 9){
          this.showloadmore =1;
        }else{
          this.showloadmore=0;
        }
       if(res.SUCCESS.FP_LIST.length > 0){
           this.nomoreproduct=0;
       }else{
        this.nomoreproduct=1;
       }
        
      }
     else{
      this.nomoreproduct=1;
      }
      
    }, (error) => {
      
      loader.dismiss();
      console.log(error);
    })
  }
  loadmore(){
    this.pagenum++;
    if(this.showloadmore ==1){
      
      let toast = this.toastCtrl.create({
        message: 'No records found.',
        duration: 3000,
        position: 'bottom'
      });
    
      toast.onDidDismiss(() => {
        console.log('Dismissed toast');
      });
    
      toast.present();
    
    }else{

      let json_data:any=[];
     json_data={"page_no":this.pagenum,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
      
    this.ApiServiceProvider.featured_product_list(json_data).subscribe((res) => {
     
      if(res.SUCCESS){
           
        for(let followList of res.SUCCESS.FP_LIST){
          this.pdplist.push(followList);
        }
        
        if(res.SUCCESS.FP_LIST.length < 9){
          this.showloadmore =1;
        }else{
          this.showloadmore=0;
        }
      }
     else{
       
      }
      
    }, (error) => {
    
      console.log(error);
    })

    }
  }
  goTopdpDetail(fp_product_id){
    this.navCtrl.push(PdpPage,{fp_product_id:fp_product_id});

  }
  addmore(){
    this.navCtrl.push(PdpPage);
    
  }
}
