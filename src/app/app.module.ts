import { BrowserModule } from '@angular/platform-browser'; 
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
// import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatemywebsitePage } from '../pages/createmywebsite/createmywebsite';
import { MapPage } from '../pages/map/map';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { SubDomaininfoPage } from '../pages/sub-domaininfo/sub-domaininfo';
import { AddProductPage } from '../pages/add-product/add-product';
import { LoginPage } from '../pages/login/login';
// import { CompanyDetailPage } from '../pages/company-detail/company-detail';
import { CompanyDetailPageModule } from '../pages/company-detail/company-detail.module';
import { FilePath } from '@ionic-native/file-path';
import { FileChooser } from '@ionic-native/file-chooser';

import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ConstantProvider } from '../providers/constant/constant';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';
import { CompinfoPage } from '../pages/compinfo/compinfo';
import { Camera } from '@ionic-native/camera';
import { Base64 } from '@ionic-native/base64';
import { Crop } from '@ionic-native/crop';
import { FCM } from '@ionic-native/fcm';
import { Device } from '@ionic-native/device';
export function httpServiceInterceptor(backend: XHRBackend,
  options: RequestOptions
) {
  return new HttpInterceptorProvider(backend, options);
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatemywebsitePage,
    MapPage,
    SubDomaininfoPage,
    DashboardPage,
    CompinfoPage,
    AddProductPage,
    LoginPage
    // CompanyDetailPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    // HttpClientModule
    CompanyDetailPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatemywebsitePage,
    MapPage,
    SubDomaininfoPage,
    DashboardPage,
    CompinfoPage,
    AddProductPage,
    LoginPage
    // CompanyDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    ConstantProvider,
    HttpInterceptorProvider,
    {
      provide: Http,
      useFactory: httpServiceInterceptor,
      deps: [XHRBackend, RequestOptions]
    },
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   // useFactory: HttpInterceptorProvider,
    //   useClass: HttpInterceptorProvider,
    //   multi : true
    // },
    Camera,
    Crop,
    Base64,
    FCM,
    Device,
    FilePath,
    FileChooser,
  ]
})
export class AppModule {}
