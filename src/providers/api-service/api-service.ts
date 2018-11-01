// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

import { ConstantProvider } from '../constant/constant';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {
  header:any;
  requestoptions:RequestOptions;

  constructor(public http: Http, private constant: ConstantProvider) {
  
  }

  get_loc_pincode(pincode){
    let url = this.constant.config.get_loc_pinURL;
    url += pincode;
  
    return this.http.get(url).map((res:Response) => res.json());;
  }

  get_categories(){
    let url = this.constant.config.get_categoriesURL;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Custom-Header', 'qwerty');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get(url,{headers : headers}).map((res:Response) => res.json());;
    //return this.http.get(url).map((res:Response) => console.log('get_categories res',res));
  }
  
  send_otp(mobile_no){
    let url = this.constant.config.send_otpURL;
    let headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Custom-Header', 'qwerty');
    url += '?mobile=' + mobile_no;
    return this.http.get(url,{headers : headers}).map((res:Response) => res.json());
  }
  
  check_registration(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
       'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
     // 'TI-LOGIN-KEY':localStorage.getItem('TI-LOGIN-KEY'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
      //'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
      //'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.check_registration;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  otp_verify(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
     // 'TI-LOGIN-KEY':localStorage.getItem('TI-LOGIN-KEY'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
      //'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
      //'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.otp_verify;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  extra_details(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
       'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.extra_details;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  get_company_details(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.get_company_details;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  update_company_details(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.update_company_details;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }

  profile_status(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.profile_status;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  featured_product_list(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.featured_product_list;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  
  featured_product_details(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.featured_product_details;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  
  add_edit_featured_product(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.add_edit_featured_product;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  
  add_category_dd(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.category_list;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());
  }
  logoff(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.logoff;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());

  }
  create_domain(json_data){
    let url = this.constant.config.baseUrl;
    this.header = new Headers({
      'Content-Type': 'application/json',
      'APP-ID':'SELLER-ONBOARDING-APP',
      'MODEL':localStorage.getItem('MODEL'),
      'PUSH-TOKEN':localStorage.getItem('PUSH-TOKEN'),
      'TI-LOGIN-KEY':localStorage.getItem('userid'),
      'OS-TYPE':localStorage.getItem('OS-TYPE'),
      'OS-VERSION':localStorage.getItem('OS-VERSION'),
      'DEVICE_ID':localStorage.getItem('DEVICE_ID'),
       'AUTH-TOKEN':localStorage.getItem('AUTH_TOKEN'),
       'AUTH-ID':localStorage.getItem('AUTH_ID'),
      'X-TI-MOBILE-APP': 1,
      'X-SELLER-ONBOARDING-APP-VERSION-ANDROID':this.constant.config.version
    });
    this.requestoptions = new RequestOptions({
      headers: this.header,
      withCredentials: true
     });    
    url += this.constant.config.create_domain;
    return this.http.post(url,json_data,this.requestoptions).map((res:Response) => res.json());

  }
  
}
