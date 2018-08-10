import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Http, Response,Headers,RequestOptions } from '@angular/http';
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

  constructor(public http: HttpClient) {
    console.log('Hello ApiServiceProvider Provider');
  }

  get_loc_pincode(pincode){
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?components=country:IN|postal_code:';
    url += pincode;
    console.log('in get pincode');
    return this.http.get(url);
  }

  get_categories(){
    let url = 'https://www.tradeindia.com/messenger/v_117/get_categories.html';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Custom-Header', 'qwerty');
    return this.http.get(url,{headers : headers});
    // return this.http.get(url).map((res:Response) => console.log('get_categories res',res));
  }
  
  send_otp(mobile_no){
    let url = 'https://www.tradeindia.com/messenger/v_117/send_otp.html';
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');
    headers = headers.set('Custom-Header', 'qwerty');
    url += '?mobile=' + mobile_no;
    return this.http.get(url,{headers : headers});
  }

}
