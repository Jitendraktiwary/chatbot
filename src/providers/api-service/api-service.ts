// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
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
    console.log('Hello ApiServiceProvider Provider');
  }

  get_loc_pincode(pincode){
    let url = this.constant.config.get_loc_pinURL;
    url += pincode;
    console.log('in get pincode');
    // return this.http.get(url);
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
      //'AUTH_TOKEN':localStorage.getItem('AUTH_TOKEN'),
      //'AUTH_ID':localStorage.getItem('AUTH_ID'),
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
      //'AUTH_TOKEN':localStorage.getItem('AUTH_TOKEN'),
      //'AUTH_ID':localStorage.getItem('AUTH_ID'),
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

}
