import { Component,ViewChild, ElementRef,Renderer } from '@angular/core';
import { ViewController,LoadingController,NavController, AlertController,ModalController,ToastController } from 'ionic-angular';
import { SubdmainurlPage } from '../subdmainurl/subdmainurl';
import { DashboardPage } from '../dashboard/dashboard';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import {  Content } from 'ionic-angular';
import { CompextraPage } from '../compextra/compextra';
import { ProductaddPage } from '../productadd/productadd';
import * as $ from "jquery";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Content) content: Content;
  @ViewChild('scrollMe') scrollElement: ElementRef;

  chats:any =[];
  message:any;
  questions:any = [
    {'message' : 'Welcome!','type' : 'bot','skip' : 1,'btn':'0'},
    {'message' : 'What is your Name?','type' : 'bot','req_info' : 'name' ,'btn':'0'},
    {'message' : 'What is your Mobile No?','type' : 'bot','req_info' : 'mobile' ,'btn':'0'},
    {'message' : 'Your otp has send your mobile number.','type' : 'bot','req_info' : 'otp_send','btn':'0','skip' : 1},
    {'message' : 'please enter your otp','type' : 'bot','req_info' : 'otp_val','btn':'0'},
    {'message' : 'What is your Company Name?','type' : 'bot','req_info' : 'co_name','btn':'0'},
    {'message' : 'What is the your Business Type?','type' : 'bot','req_info' : 'business_type','btn':'0'},
    {'message' : 'Alright,next is your business address','type' : 'bot','req_info' : 'business_address','skip' : 1,'btn':'0'},
    {'message' : 'be precise,for both your customer and SEO','type' : 'bot','req_info' : 'seo','skip' : 1,'btn':'0'},
    {'message' : 'Enter your Email Address','type' : 'bot','req_info' : 'email','btn':'0'},
    {'message' : 'Alright,!','type' : 'bot','req_info' : 'email_next','btn':'0'},
    {'message' : 'Enter your Pincode','type' : 'bot','req_info' : 'pincode','btn':'0'},
    {'message' : 'Alright,!','type' : 'bot','req_info' : 'pincode_next','btn':'0'},
    {'message' : 'Enter your Address','type' : 'bot','req_info' : 'co_add','btn':'0'},
    {'message' : 'Almost done ...','type' : 'bot','req_info' : 'phone_number_enter','btn':'0','skip' : 1},
    {'message' : 'We think this should be your business web address..','type' : 'bot','req_info' : 'sub_domain','skip' : 1,'btn':'0'},
    {'message' : 'No worry,your can always map it to an existing domain or a custom domain at later point.','type' : 'bot','req_info' : 'laterpoint','skip' : 1,'btn':'0'},
    {'message' : 'please enter the website address you want..','type' : 'bot','req_info' : 'sub_domainmain','btn':'0'},
    {'message' : 'Alright,Thanks you for giving your time.','type' : 'bot','req_info' : 'final_step','skip' : 1,'btn':'0'},
    {'message' : 'Your all detail and your sub domain is ready for your first vist .!  Thanks','type' : 'bot','req_info' : 'final','btn':'0','skip' : 1},
    {'message' : 'Alright,next is your Company Detail','type' : 'bot','req_info' : 'cmpanydetail2','skip' : 1,'btn':'0'},
    {'message' : 'please enter your Company Detail..','type' : 'bot','req_info' : 'cmpanydetail3','btn':'0'},
    {'message' : 'Alright,next is Add Your Product','type' : 'bot','req_info' : 'addproduct','btn':'0'},
  ];
  name:any;
  co_name:any;
  business_type:any;
  current_ques:any;
  clickable:any;
  showmsg:any=0;
  business_type_show:boolean = false;
  subdomainname:any;
  mainaddress:any;
  showhidesendmsg:any=0;
  mobile:any;
  otp_count:any=0;
  newuser:any;
  userid:any;
  otp:any =0;
  email:any;
  pincode:any;
  useraddress:any;
  otpregistration:any;
  upload_products:any=0;
  showproduct:any=0;
  business_type_list:any = [
    {'option' : 'Agriculture','value' : 1},
    {'option' : 'Apparel & Fashion','value' :27},
    {'option' : 'Automobile','value' :28},
    {'option' : 'Brass Hardware & Components','value' :29},
  ];
   headervalue:any=" is Typing..."
  constructor(public viewCtrl: ViewController,private loadingController: LoadingController,private toastCtrl: ToastController,private ApiServiceProvider: ApiServiceProvider,public elementRef: ElementRef,public renderer: Renderer,public modalCtrl: ModalController,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.pushChat();
  }

  pushChat(){
      
    this.scrollToBottom();
    this.chats.push({'message' : '....','type' : 'bot','btn':'0'});
     setTimeout(() =>  {
      this.headervalue='';
      this.current_ques = this.questions.shift();
      this.chats.pop();
      this.chats.push(this.current_ques);
    if(this.current_ques.skip){
      this.pushChat();
     
    }
    if(this.current_ques.req_info == 'mobile' ){
      this.showhidesendmsg=1;
     }

     if(this.current_ques.req_info == 'email_next' ){
      this.chats.pop();
      this.chats.pop();
     }
     if(this.current_ques.req_info == 'pincode_next' ){
      this.chats.pop();
      this.chats.pop();
     }
     if(this.current_ques.req_info == 'email' ){
      this.showhidesendmsg=1;
     }
     if(this.current_ques.req_info == 'pincode' ){
      this.showhidesendmsg=1;
     }

     if(this.current_ques.req_info == 'co_add' ){
      this.showhidesendmsg=1;
     }



     if(this.current_ques.req_info == 'otp_val' ){
      this.showhidesendmsg=1;
      this.otpvalidate();
     }

    if(this.current_ques.req_info == 'sub_domainmain'){
         
      this.createdomain();
          }  

    if(this.current_ques.req_info == 'cmpanydetail3'){
         
      this.companeydetail();
         } 

    if(this.current_ques.req_info == 'addproduct'){
         
      this.addproduct();
          } 

    if(this.current_ques.req_info == 'co_add'){
     
      this.registration();
    }    
    console.log(""+this.current_ques.req_info);   
    if(this.current_ques.req_info == 'business_type'){
      this.bussniessinf();
    
    }
     
     
    }, 1000);      
    this.scrollToBottom();
   
  }


  repushChat(){

     this.content.resize();
    this.scrollToBottom();
    
    setTimeout(() =>  {
      this.headervalue='';
    
      this.chats.push(this.current_ques);
     if(this.current_ques.skip){
      this.pushChat();
    }
     
    }, 1000);
   
  
  
  }

  sendMessage(){

      if(this.current_ques.req_info == 'business_type' && this.business_type == undefined ){
      this.showhidesendmsg=1;
      this.bussniessinf();
     }

     if(this.current_ques.req_info == 'co_add' && this.showhidesendmsg == 1 ){
      this.showhidesendmsg=1;
      this.useraddress=this.message;
      this.registration();
     }

     if(this.current_ques.req_info == 'email' && this.showhidesendmsg == 1){
      this.showhidesendmsg=1;
      this.email=this.message;
      this.emailval();
     }

     if(this.current_ques.req_info == 'pincode' && this.showhidesendmsg == 1){
      this.showhidesendmsg=1;
      this.pincode=this.message;
      this.pincodeval();
     }
    
     if(this.current_ques.req_info == 'mobile' && this.showhidesendmsg == 1 ){
      
       this.mobile=  this.message;
       if(this.mobile.length > 0){
        this.logincheck();
       }
       
     }
     if(this.current_ques.req_info == 'otp_val' ){
     this.otp= this.message;
     this.otpvalidate();
     if( this.showproduct == 1){

     }
    }
    if(this.current_ques.req_info == 'email_next' ){
      this.chats.pop();
      this.chats.pop();
     }
     if(this.current_ques.req_info == 'pincode_next' ){
      this.chats.pop();
      this.chats.pop();
     }

   
   if(this.showhidesendmsg == 0){

    if(this.current_ques.req_info == 'mobile'  ){
       this.mobile= this.message;
       
       this.logincheck();
     }

    

    if(this.message == '' || this.message == undefined){
          alert('Message can not be blank. !');
     } else if(this.message.length < 4){
      alert('Message less than 4 char. !');
    }else{

  
    this.content.resize();
    this.scrollToBottom();
  
    

  
    let mess_data = {'message' : this.message,'type': 'user'};
     
     if(this.current_ques.req_info == 'co_namern'){
      let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'co_name_conf'};
      name_chat.message = name_chat.message + this.co_name;
      this.chats.push(name_chat);
    }else if(this.current_ques.req_info == 'subdomainbtn_namern'){
      let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'subdomainbtn_conf'};
      name_chat.message = name_chat.message + this.subdomainname;
      this.chats.push(name_chat);
    }
    else{
      this.chats.push(mess_data);
    }
    
    if(this.current_ques.req_info == 'name'){
     
      this.name = this.message;
      let name_chat = {'message' : 'Hi ','type' : 'bot' ,'btn':'0'};
      name_chat.message = name_chat.message + this.name;
      this.chats.push(name_chat);
    }else if(this.current_ques.req_info == 'mobile'){
      this.mobile = this.message;
      
    }
    else if(this.current_ques.req_info == 'co_name'){
      this.co_name = this.message;
     
    }else if(this.current_ques.req_info == 'business_type'){
      
      this.business_type = this.message;
      
    }
       
    this.showmsg=0;
    this.headervalue=' is Typing..'
    this.message = '';
    if(this.current_ques.req_info == 'co_name'){
    
      this.showhidesendmsg=1;
      this.current_ques ={'message' : 'Confirm your Company Name','type' : 'bot','req_info' : 'co_namebtn','btn':'1'};
      this.repushChat();
    }
    else{
      this.pushChat();
    }


    

    
    this.business_type_show = false;
   
  }
   } 
  }

  msgclick(){
    this.business_type_show = true;
  }
  ionViewDidLoad(){
 
  
}
  edit(val){

    this.showhidesendmsg=0;
   
    this.content.resize();
    this.scrollToBottom();
   
    if(val == 'comp'){
     
      let name_chat = {'message' :'Re-enter Company Name?','type' : 'bot','req_info' : 'co_namern','btn':'0'};
      name_chat.message = name_chat.message;
      this.chats.pop();
      this.chats.push(name_chat);
   
    }

    if(val == 'otp'){
      
     let name_chat = {'message' :'Re-enter Company Name?','type' : 'bot','req_info' : 'co_namern','btn':'0'};
     name_chat.message = name_chat.message;
     this.chats.pop();
     this.chats.push(name_chat);
  
   }
    
  }
  confrim(val){

    this.showhidesendmsg=0;
    
    this.content.resize();
    this.scrollToBottom();
      if(val == 'comp'){
      
        let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'co_name_conf'};
        name_chat.message = name_chat.message + this.co_name;
        this.chats.pop();
        this.chats.pop();
        this.message='';
        this.chats.push(name_chat);
        this.pushChat();
      }
     
  }
  address(){
    
    this.content.resize();
    this.scrollToBottom();
    let name_chat = {'message' : '','type' : 'bot','btn':'0','req_info' : 'co_add'};
    this.questions.push(name_chat);
    this.pushChat();
  }
  bussniessinf(){
    let alert = this.alertCtrl.create();
      alert.setTitle('Select your Business Type');
  
      alert.addInput({
        type: 'checkbox',
        label: 'Exporter',
        value: 'Exporter',
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Importer',
        value: 'Importer'
      });
      
      alert.addInput({
        type: 'checkbox',
        label: 'Manufacturer',
        value: 'Manufacturer',
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Service',
        value: 'Service'
      });
      alert.addInput({
        type: 'checkbox',
        label: 'Distributor',
        value: 'Distributor'
      });
      alert.addInput({
        type: 'checkbox',
        label: 'Supplier',
        value: 'Supplier',
        
      });
  
      alert.addInput({
        type: 'checkbox',
        label: 'Trader',
        value: 'Trader'
      });
      alert.addButton({text: 'Cancel',
      handler: data => {

       this.bussniessinf();
      }
    });
      alert.addButton({
        text: 'Ok',
        handler: data => {
         if(data.length > 0){
        let business_chat = {'message' : data,'type' : 'user'};
        this.business_type=data;
        this.chats.push(business_chat);
        this.pushChat();
      }else{
        this.bussniessinf();
      }
           
        }
      });
      alert.present();
  }
  registration(){
      if( this.useraddress.length >  15){
      
      
          let loader = this.loadingController.create({
            content: "Loading, Please wait"
          }); 
          loader.present();   
          let json_data :any=[]
         json_data = {
        "mobile_no": '91'+this.mobile.trim(),
        "email":this.email.trim(),
        "co_name":this.co_name.trim(),
        "username":this.name.trim(),
        "pincode":this.pincode.trim(),
        "address":this.useraddress.trim(),
        "latitude":localStorage.getItem('client_lat'),
	      "longitude":localStorage.getItem('client_long')
        }
        localStorage.setItem('username',this.co_name);
        localStorage.setItem('mob',this.mobile.trim());

        let bussnestype =this.business_type
     
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
        if(this.newuser == 1){
          json_data.hook_reg='1';
          json_data.verify_otp='1';
        }
     
          this.ApiServiceProvider.check_registration(json_data).subscribe((res) => {
  
            loader.dismiss();
          if(res.ERROR){
            let alert = this.alertCtrl.create({
              title:'Verification Error',
              message:'Pincode does not match any City. ',
              buttons:['Ok']
            });
            alert.present();
          }else{
              
            this.newuser = 0;
               localStorage.setItem('AUTH_TOKEN',res.SUCCESS.auth_token);
               localStorage.setItem('profile_id',res.SUCCESS.profile_id);
               localStorage.setItem('mobile',this.mobile);
               localStorage.setItem('email',this.email);
               localStorage.setItem('name',this.name);
               localStorage.setItem('userid',res.SUCCESS.userid);
               localStorage.setItem('new_user', this.newuser);
                this.message='';
                this.showhidesendmsg = 0;
                let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
                name_chat.message =this.useraddress ;
                this.pushChat();
                 
               
         
          }
            
            }, (error) => {
            console.log(error);
          }) 

         
     
    }else{
      let toast = this.toastCtrl.create({
        message: 'Address should be more than 15 char',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.message='';
      this.showhidesendmsg = 1;
    }
  }
  eventHandler_code(code,keyword:any)
  {         
     if(code == 13)
      {
        this.sendMessage();      
      }   

  }
  logincheck(){
    let totallen=this.mobile.length;
    
    if(totallen > 9){
      if(Number(this.mobile)){
        let json_data = {
          "mobile_no": '91'+this.mobile.trim()
          }
        if(this.otp_count <= 3){
          this.ApiServiceProvider.check_registration(json_data).subscribe((res) => {
            this.message = '';
           if(res.SUCCESS.new_user){
              this.newuser=res.SUCCESS.new_user;
              this.userid='0'
            }else{
              localStorage.setItem('AUTH_TOKEN',res.SUCCESS.auth_token);
              localStorage.setItem('profile_id',res.SUCCESS.profile_id);
             localStorage.setItem('mobile',res.SUCCESS.mobile_no);
             localStorage.setItem('email',res.SUCCESS.email);
             localStorage.setItem('name',res.SUCCESS.username);
             localStorage.setItem('userid',res.SUCCESS.userid);
             localStorage.setItem('userid',res.SUCCESS.userid);
             this.userid=res.SUCCESS.userid;
             this.newuser = 0;
            }
            localStorage.setItem('new_user',res.SUCCESS.new_user);
            
            
            this.showhidesendmsg = 0;
            let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
             name_chat.message =this.mobile ;
              this.chats.push(name_chat);
              this.pushChat();
          }, (error) => {
              let alert = this.alertCtrl.create({
                title:'Error in Sending OTP',
                message:'Please try again after some time.',
                buttons:['Ok']
              });
              alert.present();
          })
        }else{
          let alert = this.alertCtrl.create({
            title:'Verification Error',
            message:'Maximun login attempts reached.',
            buttons:['Ok']
          });
          alert.present();
        }
  
      }else{
       this.mobile='';
       this.showhidesendmsg = 1;
       let toast = this.toastCtrl.create({
         message: 'Mobile should be only numeric',
         duration: 3000,
         position: 'top'
       });
        
       toast.present();
       
       } 
    }else{
       this.mobile='';
       this.showhidesendmsg = 1;
       let toast = this.toastCtrl.create({
      message: 'Mobile should be minimun 10 digit.',
      duration: 3000,
      position: 'top'
    });
     
    toast.present();
    }
    
  }

  otpvalidate(){
    if(this.otp.length > 3){

   
    let json_data :any=[]
    let userid:any;
     if(localStorage.getItem('userid')){
       userid=localStorage.getItem('userid');
       json_data = {
         "mobile_no": '91'+this.mobile.trim(),
         "userid":userid,
         "otp":this.otp.trim(),
        
         }
     }else{
       userid='';
       json_data = {
         "mobile_no": '91'+this.mobile.trim(),
         "otp":this.otp.trim(),
         }
     }


 this.ApiServiceProvider.otp_verify(json_data).subscribe((res) => {
  
   if(res.STATUS == 0 || res['STATUS'] == 0){
    $('.scroll-content').addClass('openLayer');
     if(this.userid == '0'){
     
         this.message='';
         this.showhidesendmsg = 0;
         this.pushChat();
     }else{
      this.showhidesendmsg = 1;
      let json_data :any=[]
    json_data = {
      "profile_id": localStorage.getItem('profile_id'),
      "userid":localStorage.getItem('userid'),
       
      }
      let loader = this.loadingController.create({
        content: "Loading, Please wait"
      }); 
      loader.present();
      this.ApiServiceProvider.profile_status(json_data).subscribe((res) => {
   
    if(res.STATUS == 0 || res['STATUS'] == 0){
       
      this.upload_products=res.SUCCESS.upload_products;

      if(this.upload_products == 50){
        this.navCtrl.setRoot(DashboardPage);
      }else {
        this.showproduct=1;
      }
    }else{
      let alert = this.alertCtrl.create({
        title:'Dashboard ',
        message:'your session expired ! please login again.',
        buttons: ['Ok']
      });
      alert.present();
    }
    loader.dismiss();
    }, (error) => {
      loader.dismiss();
    console.log(error);
  })
    
    }
    
   }else{
     this.otp='';
     this.showhidesendmsg = 1;
     let toast = this.toastCtrl.create({
      message: 'OTP you have entered is invalid.',
      duration: 3000,
      position: 'top'
    });
    toast.present();
    
   }
   
   }, (error) => {
   console.log(error);
 }) 
}
    
  }

  scrollToBottom() {
    setTimeout(() => {
      if (this.content.scrollToBottom) {
        this.content.scrollToBottom();
      }
    }, 400)
  }

  
  private focus() {
    if (this.scrollElement && this.scrollElement.nativeElement) {
      this.scrollElement.nativeElement.focus();
    }
  }

  private setTextareaScroll() {
    const textarea =this.scrollElement.nativeElement;
    textarea.scrollTop = textarea.scrollHeight;
  }
  

  createdomain(){
    const modal = this.modalCtrl.create(SubdmainurlPage,{name:this.name,comp_name:this.co_name,address:this.mainaddress,bussness_type:this.business_type,home:0});
      modal.onDidDismiss(res => {
       
       if(res){
   
          let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
          name_chat.message =res.subdomain ;
          this.mobile=res.mobile;
          this.chats.push(name_chat);
          this.pushChat();
      
        
       }else{
       
        this.createdomain();
       }
       
        
      });
      modal.present();
  }

  companeydetail(){
    const modal = this.modalCtrl.create(CompextraPage,{homevalue:0});
    modal.onDidDismiss(res => {
     
     if(res){
 
        let name_chat = {'message' : 'thanks for giving your time. ','type' : 'user' ,'btn':'0'};
        this.mobile=res.mobile;
        this.chats.push(name_chat);
        this.pushChat();
    
      
     }else{
     
      this.companeydetail();
     }
     
      
    });
    modal.present();
  }
 addproduct(){
  
  this.navCtrl.push(ProductaddPage,{ishome:0}) .then(() =>{
    const index =this.viewCtrl.index;
     this.navCtrl.remove(index);
 
    });
 
  }
  emailval(){
    if( this.email.length >  0){
      if(!this.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)){
        let toast = this.toastCtrl.create({
        message: 'Email should be in correct format like yourname@example.com.',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.email='';
      this.showhidesendmsg = 1;
       }else{
        this.showhidesendmsg = 0;
        let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
          name_chat.message =this.email ;

         this.chats.push(name_chat);
          this.pushChat();
      }
    }
     
  }
  pincodeval(){
    if( this.pincode.length >  5){
      if(Number(this.pincode)){
        this.showhidesendmsg = 0;
        let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
          name_chat.message =this.pincode ;
          this.chats.push(name_chat);
          this.pushChat();
      }else{
        let toast = this.toastCtrl.create({
          message: 'Pincode should be numeric and not more than six digit',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.message='';
        this.pincode='';
        this.showhidesendmsg = 1;
        
      }
    }else{
      let toast = this.toastCtrl.create({
        message: 'Pincode should be numeric and not more than six digit',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.message='';
      this.pincode='';
      this.showhidesendmsg = 1;
    }
     
  }

  goto(val){
    
    if(val == 'dashborad'){
      this.navCtrl.setRoot(DashboardPage);
    }else{
      this.navCtrl.push(ProductaddPage);
    }
  }
}