import { Component,ViewChild,ElementRef } from '@angular/core';
import { NavController,Content,List } from 'ionic-angular';
import * as $ from 'jquery';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild(Content) contentArea: Content;
  @ViewChild(List, {read: ElementRef}) chatList: ElementRef;
  chats:any =[];
  message:any;
  questions:any = [
    {'message' : 'Welcome!','type' : 'bot','skip' : 1,'btn':'0'},
    {'message' : 'What is your Name?','type' : 'bot','req_info' : 'name' ,'btn':'0'},
    {'message' : 'What is your Company Name?','type' : 'bot','req_info' : 'co_name','btn':'0'},
    {'message' : 'What is the your Business Type?','type' : 'bot','req_info' : 'business_type','btn':'0'},
    {'message' : 'Alright,next is your business address','type' : 'bot','req_info' : 'business_address','skip' : 1,'btn':'0'},
    {'message' : 'be precise,for both your customer and SEO','type' : 'bot','req_info' : 'seo','skip' : 1,'btn':'0'},
    {'message' : 'What is SEO ? Enter your Address','type' : 'bot','req_info' : 'seobtn','skip' : 1,'btn':'1'},


  ];
  name:any;
  co_name:any;
  business_type:any;
  current_ques:any;
  clickable:any;
  showmsg:any=0;
  business_type_show:boolean = false;
  business_type_list:any = [
    {'option' : 'Agriculture','value' : 1},
    {'option' : 'Apparel & Fashion','value' :27},
    {'option' : 'Automobile','value' :28},
    {'option' : 'Brass Hardware & Components','value' :29},
  ];
  private mutationObserver: MutationObserver;
  headervalue:any=" is Typing..."
  constructor(public navCtrl: NavController) {
    this.pushChat();
  }

  pushChat(){
    this.chats.push({'message' : '....','type' : 'bot','btn':'0'});
    setTimeout(() =>  {
      this.headervalue='';
      this.current_ques = this.questions.shift();
      this.chats.pop();
      this.chats.push(this.current_ques);
    if(this.current_ques.skip){
      this.pushChat();
    }
     
    }, 1000);      
  
  }
  repushChat(){
    
    setTimeout(() =>  {
      this.headervalue='';
    
      this.chats.push(this.current_ques);
     if(this.current_ques.skip){
      this.pushChat();
    }
     
    }, 1000);
   
       
  
  }

  sendMessage(){

    // event.preventDefault();
    // document.getElementById( 'side-2' ).className = 'flip flip-side-1';
    // document.getElementById( 'side-1' ).className = 'flip flip-side-2';  
    //$('.card').toggle('is-flipped');


    console.log(this.message);
    let mess_data = {'message' : this.message};
    if(this.current_ques.req_info == 'co_namern'){
      let name_chat = {'message' : '','btn':'1','req_info' : 'co_name_conf'};
      name_chat.message = name_chat.message + this.co_name;
      this.chats.push(name_chat);
    }else{
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
      this.current_ques ={'message' : 'Confirm your Company Name','type' : 'bot','req_info' : 'co_namebtn','btn':'1'};
      this.repushChat();
    }else{
      this.pushChat();
    }
  
    this.business_type_show = false;
    this.contentArea.scrollToBottom();
  }

  msgclick(){
    this.business_type_show = true;
  }
  ionViewDidLoad(){
 
    this.mutationObserver = new MutationObserver((mutations) => {
        this.contentArea.scrollToBottom();
    });

    this.mutationObserver.observe(this.chatList.nativeElement, {
        childList: true
    });

}
  edit(val){
   
    console.log(val);
    if(val == 'comp'){
       console.log("1"+val);
      let name_chat = {'message' :'Re-enter Company Name?','type' : 'bot','req_info' : 'co_namern','btn':'0'};
      name_chat.message = name_chat.message;
      this.chats.pop();
      this.chats.push(name_chat);
     // this.pushChat();
    }

  }
  confrim(val){
      if(val == 'comp'){
      
        let name_chat = {'message' : '','btn':'1','req_info' : 'co_name_conf'};
        name_chat.message = name_chat.message + this.co_name;
        this.chats.pop();
        this.chats.pop();
        this.chats.push(name_chat);
        this.pushChat();
      }
  }
}
