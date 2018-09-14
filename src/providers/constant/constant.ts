// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ConstantProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ConstantProvider {
  config:any;

  constructor() {
    console.log('Hello ConstantProvider Provider');
    this.initConfig();
  }

  initConfig(){
    this.config = {
     'version':'1.1.3',
      'baseUrl':'http://www.trade-india-local.com:33209/ti-mobile-apps/',
      'get_loc_pinURL' : 'http://maps.googleapis.com/maps/api/geocode/json?components=country:IN|postal_code:',
      'get_categoriesURL' : 'http://www.trade-india-local.com:30303/messenger/v_117/get_categories.html',
      // 'get_categoriesURL' : 'https://www.tradeindia.com/messenger/v_117/get_categories.html',
      'send_otpURL' : 'http://www.trade-india-local.com:30303/messenger/v_117/send_otp.html',
      'check_registration':'seller-onboarding/check_registration.html',
      'otp_verify':'seller-onboarding/otp_verify.html',
      'extra_details':'seller-onboarding/apis/extra_details.html',
      'get_company_details':'seller-onboarding/apis/get_company_details.html',
      'update_company_details':'seller-onboarding/apis/update_company_details.html',
      'profile_status':'seller-onboarding/apis/profile_status.html',
      'featured_product_list':'seller-onboarding/apis/featured_product_list.html',
      'featured_product_details':'seller-onboarding/apis/featured_product_details.html',
      'add_edit_featured_product':'seller-onboarding/apis/add_edit_featured_product.html',
      'category_list':'seller-onboarding/apis/category_list.html'

    }
  }

}
