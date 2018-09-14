import { Component } from '@angular/core';
import { ToastController,IonicPage, NavController, NavParams,AlertController,ViewController, ActionSheetController, normalizeURL } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { UpadteProfilePage } from '../upadte-profile/upadte-profile';
import { UpdateComPage } from '../update-com/update-com';
import { CompinfoPage } from '../compinfo/compinfo';
import { splitAtColon } from '@angular/compiler/src/util';

/**
 * Generated class for the CompanyDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-company-detail',
  templateUrl: 'company-detail.html',
})
export class CompanyDetailPage {
  detail:any=[];
  extd=0;
  name:any;
  email:any;
  mobile:any;
  comp_name:any;
  pincode:any;
  address:any;
  Traderchk:any=false;
  Exporterchk:any=false;
  Importerchk:any=false;
  Manufacturerchk:any=false;
  Servicechk:any=false;
  Distributorchk:any=false;
  Supplierchk:any=false;
   
  turnover:any;
  staff:any;
  desc:any;
  certficate:any;
  compimg:any;

   
  constructor(private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,public actionsheetCtrl: ActionSheetController,public viewCtrl: ViewController,public alertCtrl: AlertController,public navCtrl: NavController, public navParams: NavParams) {
  this.getCompDetail();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CompanyDetailPage');
  }
  getCompDetail(){
    let json_data:any=[];
    json_data={'userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};

    this.ApiServiceProvider.get_company_details(json_data).subscribe((res) => {
      console.log(res);
      if(res.SUCCESS){
        this.detail=res['SUCCESS'];
        this.name= this.detail.details.user_details.username;
        this.email= this.detail.details.user_details.email;

        this.mobile= this.detail.details.user_details.mobile;
        this.mobile=this.mobile.split("+91");
        this.name=this.name.split("Mr.");

        this.comp_name= this.detail.details.comp_details.co_name;
        this.pincode= this.detail.details.comp_details.pincode;
        this.address= this.detail.details.comp_details.address;
        console.log(this.detail);
        if (this.detail.details.comp_details.ifexporter == 1){
          this.Exporterchk=true;
        } 
         if(this.detail.details.comp_details.ifimporter == 1){
          this.Importerchk=true;
        }
         if(this.detail.details.comp_details.ifmanu == 1){
          this.Manufacturerchk=true;
        }
         if(this.detail.details.comp_details.ifservice == 1){
          this.Servicechk=true;
        }
         if(this.detail.details.comp_details.ifdistributor == 1){
          this.Distributorchk=true;
        }
         if(this.detail.details.comp_details.ifsupplier == 1){
          this.Supplierchk=true;
        }
         if(this.detail.details.comp_details.iftrader == 1){
          this.Traderchk=true;
        }  
        
          
        this.certficate= this.detail.details.comp_details.certificate_img_url;
        this.compimg= this.detail.details.comp_details.comp_pic_img_url;
        this.desc= this.detail.details.comp_details.co_info;
        this.staff= this.detail.details.comp_details.staff;
        this.turnover= this.detail.details.comp_details.turnover;


        this.extd=1;
      }else{
        this.extd=2;
      }
      
    }, (error) => {
      console.log(error);
    })
  }
  goback(){
    this.navCtrl.pop();
  }
  UpdateProfile(val){
   if(val == 'USER'){
     this.navCtrl.push(UpadteProfilePage,{name:this.name[1],email:this.email,mobile:this.mobile[1]});
   }else if(val == 'EXTRA'){
    this.navCtrl.push(CompinfoPage,{certficate:this.certficate,compimg:this.compimg,desc:this.desc,staff:this.staff,turnover:this.turnover});
   }
   else if(val == 'COMP'){
    this.navCtrl.push(UpdateComPage,{comp_name:this.comp_name,pincode:this.pincode,address:this.address});
   }else if(val == 'NATURE'){
    let alert = this.alertCtrl.create();
      alert.setTitle('Select your Business Type');
  
      alert.addInput({
        type: 'checkbox',
        label: 'Exporter',
        value: 'Exporter',
        checked: this.Exporterchk
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Importer',
        value: 'Importer',
        checked: this.Importerchk
      });
      
      alert.addInput({
        type: 'checkbox',
        label: 'Manufacturer',
        value: 'Manufacturer',
        checked: this.Manufacturerchk
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Service',
        value: 'Service',
        checked: this.Servicechk
      });
      alert.addInput({
        type: 'checkbox',
        label: 'Distributor',
        value: 'Distributor',
        checked: this.Distributorchk
      });
      alert.addInput({
        type: 'checkbox',
        label: 'Supplier',
        value: 'Supplier',
        checked: this.Supplierchk
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Trader',
        value: 'Trader',
        checked: this.Traderchk
      });
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {

          let bussnestype =data;
          let json_data:any=[];
          json_data={'update_section':'NOB','userid':localStorage.getItem('userid'),'profile_id':localStorage.getItem('profile_id')};
          json_data.ifexporter='0';
          json_data.ifimporter='0';
          json_data.ifmanu='0';
          json_data.ifdistributor='0';
          json_data.ifsupplier='0';
          json_data.iftrader='0';
          json_data.ifexporter='0';
          json_data.ifservice='0';
          console.log("bussnestype>>>>"+bussnestype);
          for(let i in bussnestype)
          { 
            if(bussnestype[i] == 'Exporter'){
              json_data.ifexporter='1';
            } else if(bussnestype[i] == 'Importer'){
              json_data.ifimporter='1';
            }else if(bussnestype[i] == 'Manufacturer'){
              json_data.ifmanu='1';
            }else if(bussnestype[i] == 'Service'){
              json_data.ifservice='1';
            }else if(bussnestype[i] == 'Distributor'){
              json_data.ifdistributor='1';
            }else if(bussnestype[i] == 'Supplier'){
              json_data.ifsupplier='1';
            }else if(bussnestype[i] == 'Trader'){
              json_data.iftrader='1';
            }          
          }
          this.ApiServiceProvider.update_company_details(json_data).subscribe((res) => {
            console.log(res);
            if(res.SUCCESS){
              this. getCompDetail();
            }
            
          }, (error) => {
            console.log(error);
          })
            
        }
      });
      alert.present();
   }
  }
}
