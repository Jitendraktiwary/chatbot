import { Component,ViewChild, ElementRef,Renderer } from '@angular/core';
import { NavController, AlertController,ModalController } from 'ionic-angular';
import { RegistrationPage } from '../registration/registration';
import { SubDomaininfoPage } from '../sub-domaininfo/sub-domaininfo';
//import { CompinfoPage } from '../compinfo/compinfo';
import { DashboardPage } from '../dashboard/dashboard';
//import { ApiServiceProvider } from '../../providers/api-service/api-service';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('scrollMe') scrollElement: ElementRef;
  // @ViewChild(List, {read: ElementRef}) chatList: ElementRef;
  chats:any =[];
  message:any;
  questions:any = [
    {'message' : 'Welcome!','type' : 'bot','skip' : 1,'btn':'0'},
    {'message' : 'What is your Name?','type' : 'bot','req_info' : 'name' ,'btn':'0'},
    {'message' : 'What is your Company Name?','type' : 'bot','req_info' : 'co_name','btn':'0'},
    {'message' : 'What is the your Business Type?','type' : 'bot','req_info' : 'business_type','btn':'0'},
    {'message' : 'Alright,next is your business address','type' : 'bot','req_info' : 'business_address','skip' : 1,'btn':'0'},
    {'message' : 'be precise,for both your customer and SEO','type' : 'bot','req_info' : 'seo','skip' : 1,'btn':'0'},
    {'message' : 'Enter your Address','type' : 'bot','req_info' : 'co_add','btn':'0'},
    {'message' : 'Almost done ...','type' : 'bot','req_info' : 'phone_number_enter','btn':'0','skip' : 1},
    {'message' : 'We think this should be your business web address..','type' : 'bot','req_info' : 'sub_domain','skip' : 1,'btn':'0'},
    {'message' : 'No worry,your can always map it to an existing domain or a custom domain at later point.','type' : 'bot','req_info' : 'laterpoint','skip' : 1,'btn':'0'},
    {'message' : 'please enter the website address you want..','type' : 'bot','req_info' : 'sub_domainmain','btn':'0'},
    // {'message' : 'Alright,Thanks you for giving your time.','type' : 'bot','req_info' : 'final_step','skip' : 1,'btn':'0'},
    // {'message' : 'Your all detail and your sub domain is ready for your first vist .!  Thanks','type' : 'bot','req_info' : 'final','btn':'0'},
    // {'message' : 'Alright,next is your Company Detail','type' : 'bot','req_info' : 'cmpanydetail2','skip' : 1,'btn':'0'},
    // {'message' : 'please enter your Company Detail..','type' : 'bot','req_info' : 'cmpanydetail3','btn':'0'},
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
  business_type_list:any = [
    {'option' : 'Agriculture','value' : 1},
    {'option' : 'Apparel & Fashion','value' :27},
    {'option' : 'Automobile','value' :28},
    {'option' : 'Brass Hardware & Components','value' :29},
  ];
   headervalue:any=" is Typing..."
  constructor(public elementRef: ElementRef,public renderer: Renderer,public modalCtrl: ModalController,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.pushChat();
  }

  pushChat(){
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
    this.chats.push({'message' : '....','type' : 'bot','btn':'0'});
     setTimeout(() =>  {
      this.headervalue='';
      this.current_ques = this.questions.shift();
      this.chats.pop();
      this.chats.push(this.current_ques);
    if(this.current_ques.skip){
      this.pushChat();
    }

    if(this.current_ques.req_info == 'sub_domainmain'){
         
      this.navCtrl.push(SubDomaininfoPage,{name:this.name,comp_name:this.co_name,address:this.mainaddress,bussness_type:this.business_type});
    }  

    if(this.current_ques.req_info == 'co_add'){
     
      this.registration();
    }    
    console.log(""+this.current_ques.req_info);   
    if(this.current_ques.req_info == 'business_type'){
      this.bussniessinf();
    
    }
     
     
    }, 1000);      
    
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
  }


  repushChat(){

    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
    
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

     if(this.current_ques.req_info == 'co_add' && this.mobile == undefined ){
      this.showhidesendmsg=1;
      this.registration();
     }


   if(this.showhidesendmsg == 0){

    if(this.message == '' || this.message == undefined){
          alert('Message can not be blank. !');
     } else if(this.message.length < 4){
      alert('Message less than 4 char. !');
    }else{

    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
  
       
  
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
    }else if(this.current_ques.req_info == 'co_name'){
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
    alert("ok2");
    this.showhidesendmsg=0;
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
    console.log(val);
    if(val == 'comp'){
       console.log("1"+val);
      let name_chat = {'message' :'Re-enter Company Name?','type' : 'bot','req_info' : 'co_namern','btn':'0'};
      name_chat.message = name_chat.message;
      this.chats.pop();
      this.chats.push(name_chat);
   
    }
    
  }
  confrim(val){
    alert("ok");
    this.showhidesendmsg=0;
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
      if(val == 'comp'){
      
        let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'co_name_conf'};
        name_chat.message = name_chat.message + this.co_name;
        this.chats.pop();
        this.chats.pop();
        this.chats.push(name_chat);
        this.pushChat();
      }
     
  }
  address(){
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
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
         // this.showhidesendmsg=0;
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
    const modal = this.modalCtrl.create(RegistrationPage,{'name':this.name,'co_name':this.co_name,'business_type':this.business_type});
      modal.onDidDismiss(res => {
        console.log(res);
        if(res.is_login){
          this.navCtrl.setRoot(DashboardPage);
        }else{
          let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
        name_chat.message = name_chat.message + res.email+','+res.mobile+','+res.flat+','+res.pincode;
        this.mobile=res.mobile;
        this.chats.push(name_chat);
        this.pushChat();
        }
        
      });
      modal.present();
  }
  eventHandler_code(code,keyword:any)
  {         
     if(code == 13)
      {
        this.sendMessage();      
      }   

  }
}
