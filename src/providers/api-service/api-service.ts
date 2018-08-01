// import { HttpClient } from '@angular/common/http';
import { Http, Response,Headers,RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiServiceProvider {

  constructor(public http: Http) {
    console.log('Hello ApiServiceProvider Provider');
  }

  get_loc_pincode(pincode){
    let url = 'http://maps.googleapis.com/maps/api/geocode/json?components=country:IN|postal_code:';
    url += pincode;
    return this.http.get(url).map((res:Response) => res.json());
  }

  get_categories(){
    let url = 'https://www.tradeindia.com/messenger/v_117/get_categories.html';
    return this.http.get(url).map((res:Response) => res.json());
  }

}
