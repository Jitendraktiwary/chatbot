import { Component } from '@angular/core';
import { AlertController,LoadingController,IonicPage, NavController, NavParams,ViewController,Platform  } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';



/**
 * Generated class for the SubdmainurlPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subdmainurl',
  templateUrl: 'subdmainurl.html',
})
export class SubdmainurlPage {

  name:any;
 company:any;
 busnesstype:any;
 address:any;
 subdomain:any;
 showdiv:any=0;
 sugessstedsubdomain:any;
 subdomainfo:any=0;
 category:any;
 sugestmsg:any;
 ishome:any='1';

 constructor(public platform: Platform,public alertCtrl: AlertController,private ApiServiceProvider: ApiServiceProvider,private loadingController: LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubdmainurlPage');
  }
  getsubdomaininfo(){
   
    this.subdomainfo=0;

    if(this.sugessstedsubdomain == '' || this.sugessstedsubdomain == undefined){
      this.subdomain=this.subdomain; 
    }else{
      this.subdomain=this.sugessstedsubdomain;
    }
    let json_data:any=[];
    json_data={'sub_domain':this.subdomain,'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
    console.log(json_data);
      let loader = this.loadingController.create({
      content: "Loading, Please wait"
    }); 
    loader.present();
   this.ApiServiceProvider.create_domain(json_data).subscribe((res) => {
    loader.dismiss();
    
     if(res.SUCCESS){
   
      if(res.SUCCESS.suggestions){
        this.subdomainfo=1;
        this.sugestmsg=res.SUCCESS.MESSAGE;
        this.showdiv=0;
        this.category=[];
        for(let i in res.SUCCESS.suggestions)
          { 
            this.category.push({value:res.SUCCESS.suggestions[i] ,option:res.SUCCESS.suggestions[i]});
            
          }

      }else{
        let json_data = {'subdomain':'www.tradeindia.com/'+this.subdomain};
        this.viewCtrl.dismiss(json_data);
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
    loader.dismiss();
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
}
