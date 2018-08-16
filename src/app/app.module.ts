import { BrowserModule } from '@angular/platform-browser'; 
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

// import { Http, HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { CreatemywebsitePage } from '../pages/createmywebsite/createmywebsite';
import { MapPage } from '../pages/map/map';
import { DashboradPage } from '../pages/dashborad/dashborad';
import { SubDomaininfoPage } from '../pages/sub-domaininfo/sub-domaininfo';
import { ApiServiceProvider } from '../providers/api-service/api-service';
import { ConstantProvider } from '../providers/constant/constant';
import { HttpInterceptorProvider } from '../providers/http-interceptor/http-interceptor';

// export function httpServiceInterceptor(backend: XHRBackend,
//   options: RequestOptions
// ) {
//   return new HttpInterceptorProvider(backend, options);
// };

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CreatemywebsitePage,
    MapPage,
    SubDomaininfoPage,
    DashboradPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    //HttpModule
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CreatemywebsitePage,
    MapPage,
    SubDomaininfoPage,
    DashboradPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ApiServiceProvider,
    ConstantProvider,
    // HttpInterceptorProvider,
    {
      provide: HTTP_INTERCEPTORS,
      // useFactory: HttpInterceptorProvider,
      useClass: HttpInterceptorProvider,
      multi : true
    },
  ]
})
export class AppModule {}
