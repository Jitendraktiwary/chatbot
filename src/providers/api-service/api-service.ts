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

  constructor(public http: Http, private constant: ConstantProvider) {
    console.log('Hello ApiServiceProvider Provider');
  }

  get_loc_pincode(pincode){
    let url = this.constant.config.get_loc_pinURL;
    url += pincode;
    console.log('in get pincode');
    // return this.http.get(url);
    return this.http.get(url).map((res:Response) => console.log('get_loc_pincode res',res));
  }

  get_categories(){
    let url = this.constant.config.get_categoriesURL;
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.set('Custom-Header', 'qwerty');
    // headers = headers.set('Access-Control-Allow-Origin', '*');
    let headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Custom-Header', 'qwerty');
    headers.set('Access-Control-Allow-Origin', '*');
    return this.http.get(url,{headers : headers});
    // return this.http.get(url).map((res:Response) => console.log('get_categories res',res));
  }
  
  send_otp(mobile_no){
    let url = this.constant.config.send_otpURL;
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    // headers = headers.set('Custom-Header', 'qwerty');
    let headers = new Headers();
    headers.set('Content-Type', 'application/json; charset=utf-8');
    headers.set('Custom-Header', 'qwerty');
    url += '?mobile=' + mobile_no;
    return this.http.get(url,{headers : headers});
  }

}
