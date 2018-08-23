import { Component,ViewChild, ElementRef } from '@angular/core';
import { NavController,Content, AlertController,ModalController } from 'ionic-angular';
import { MapPage } from '../map/map';
import { SubDomaininfoPage } from '../sub-domaininfo/sub-domaininfo';
import { CompinfoPage } from '../compinfo/compinfo';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
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
    {'message' : 'please enter the website address you want..','type' : 'bot','req_info' : 'sub_domain','btn':'0'},
    {'message' : 'Alright,Thanks you for giving your time.','type' : 'bot','req_info' : 'final_step','skip' : 1,'btn':'0'},
    {'message' : 'Your all detail and your sub domain is ready for your first vist .!  Thanks','type' : 'bot','req_info' : 'final','btn':'0'},
    {'message' : 'Alright,next is your Company Detail','type' : 'bot','req_info' : 'cmpanydetail2','skip' : 1,'btn':'0'},
    {'message' : 'please enter your Company Detail..','type' : 'bot','req_info' : 'cmpanydetail3','btn':'0'},
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
  business_type_list:any = [
    {'option' : 'Agriculture','value' : 1},
    {'option' : 'Apparel & Fashion','value' :27},
    {'option' : 'Automobile','value' :28},
    {'option' : 'Brass Hardware & Components','value' :29},
  ];
  private mutationObserver: MutationObserver;
  headervalue:any=" is Typing..."
  constructor(private ApiServiceProvider :ApiServiceProvider,public modalCtrl: ModalController,public navCtrl: NavController,public alertCtrl: AlertController) {
    this.pushChat();
    this.ApiServiceProvider.get_categories().subscribe((res) => {
      console.log('api service hit');
    },(error) => {
      console.log('error');
    })
  }

  pushChat(){
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
    this.chats.push({'message' : '....','type' : 'bot','btn':'0'});
    
    setTimeout(function () {
      var itemList = document.getElementById("scrollBottom");
      var chatList = document.getElementById("chatscroll");
    }, 10);
    // this.content.scrollToBottom();
    // document.getElementById('scrollBottom').scrollIntoView();
    setTimeout(() =>  {
      this.headervalue='';
      this.current_ques = this.questions.shift();
      this.chats.pop();
      this.chats.push(this.current_ques);
    if(this.current_ques.skip){
      this.pushChat();
    }
    if(this.current_ques.req_info == 'co_add'){
      const modal = this.modalCtrl.create(MapPage,{'name':this.name,'co_name':this.co_name,'business_type':this.business_type});
      modal.onDidDismiss(res => {
        console.log(res);
        let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
        name_chat.message = name_chat.message + res.email+','+res.mobile+','+res.flat+','+res.pincode;
        this.chats.push(name_chat);
        this.pushChat();
      });
      modal.present();
      
    }       
    if(this.current_ques.req_info == 'business_type'){
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
      alert.addButton('Cancel');
      alert.addButton({
        text: 'Okay',
        handler: data => {

          console.log('Checkbox data:', data);
            let business_chat = {'message' : data,'type' : 'user'};
            this.business_type=data;
            this.chats.push(business_chat);
            this.pushChat();
        }
      });
      alert.present();
    
    }
    if(this.current_ques.req_info == 'final'){
      const modal = this.modalCtrl.create(SubDomaininfoPage,{name:this.name,comp_name:this.co_name,address:this.mainaddress,sub_domain:this.subdomainname,bussness_type:this.business_type});
      modal.onDidDismiss(res => {
        this.pushChat();
      });
      modal.present();
     // this.navCtrl.push(SubDomaininfoPage,{name:this.name,comp_name:this.co_name,address:this.mainaddress,sub_domain:this.subdomainname,bussness_type:this.business_type});
     
    }
    if(this.current_ques.req_info == 'cmpanydetail3'){
      const modal = this.modalCtrl.create(CompinfoPage);
      modal.onDidDismiss(res => {
        let name_chat = {'message' : ' ','type' : 'user' ,'btn':'0'};
        name_chat.message = name_chat.message +'Descriptin :'+res.desc+',No of Emp :'+res.Noofemp+',Trun over :'+res.turnover;
        this.chats.push(name_chat);
        this.pushChat();
      });
      modal.present();
     // this.navCtrl.push(SubDomaininfoPage,{name:this.name,comp_name:this.co_name,address:this.mainaddress,sub_domain:this.subdomainname,bussness_type:this.business_type});
     
    }
    
     
    }, 1000);      
    // setTimeout(() => {
    //   this.content.scrollToBottom();
    //   }, 500);
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
   
   
    setTimeout( ()=> {
      this.scrollElement.nativeElement.scrollTop = this.scrollElement.nativeElement.scrollHeight+10;
    }, 5);
  
     // $(".chatbox").scrollTop();

    // var element = document.getElementById("chats");
     // I can't remember why I added a short timeout, 
     // but you might be able to use ngzone instead.
     // the below works great though. 
    
  
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
    else if(this.current_ques.req_info == 'sub_domain'){
      
      this.subdomainname = this.message;
      
    }
   
    this.showmsg=0;
    this.headervalue=' is Typing..'
    this.message = '';
    if(this.current_ques.req_info == 'co_name'){
      this.current_ques ={'message' : 'Confirm your Company Name','type' : 'bot','req_info' : 'co_namebtn','btn':'1'};
      this.repushChat();
    }
    else if(this.current_ques.req_info == 'sub_domain'){
     // this.current_ques ={'message' : 'Confirm your Sub Domain Name','type' : 'bot','req_info' : 'conf_subdomainbtn','btn':'1'};
      let alert = this.alertCtrl.create({
        title: 'Confirm Domain',
        message: 'Confirm your Sub Domain Name?',
        buttons: [
          {
            text: 'Edit',
            role: 'cancel',
            handler: () => {
              let name_chat = {'message' :'Re-enter Sub Domain Name?','type' : 'bot','req_info' : 'subdomainbtn_namern','btn':'0'};
                name_chat.message = name_chat.message;
                this.chats.pop();
                this.chats.push(name_chat);
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'subdomainbtn_conf'};
              name_chat.message = name_chat.message + this.subdomainname;
              this.chats.pop();
              this.chats.pop();
              this.chats.push(name_chat);
              this.pushChat();
            }
          }
        ]
      });
      alert.present();
      
    }
    else{
      this.pushChat();
    }
  
    this.business_type_show = false;
    // this.contentArea.scrollToBottom();
  }

  msgclick(){
    this.business_type_show = true;
  }
  ionViewDidLoad(){
 
  
}
  edit(val){
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
    if(val == 'domain'){
      console.log("1"+val);
     let name_chat = {'message' :'Re-enter Sub Domain Name?','type' : 'bot','req_info' : 'subdomainbtn_namern','btn':'0'};
     name_chat.message = name_chat.message;
     this.chats.pop();
     this.chats.push(name_chat);
  
   }

  }
  confrim(val){
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
      if(val == 'domain'){
      
        let name_chat = {'message' : '','type' : 'user','btn':'1','req_info' : 'subdomainbtn_conf'};
        name_chat.message = name_chat.message + this.subdomainname;
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
}
