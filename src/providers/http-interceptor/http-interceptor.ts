import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
            // get the token from a service
    
            const token: string = '1234';
    
            // add it if we have one
    
            if (token) {
                req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
            }
    
            // if this is a login-request the header is 
    
            // already set to x/www/formurl/encoded. 
    
            // so if we already have a content-type, do not 
    
            // set it, but if we don't have one, set it to 
    
            // default --> json
    
            if (!req.headers.has('Content-Type')) {
                req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
            }
    
            // setting the accept header
    
            req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
            return next.handle(req);
        }

}
// import { Injectable } from '@angular/core';

// // import {
// //   Http,
// //   ConnectionBackend,
// //   RequestOptions,
// //   RequestOptionsArgs,
// //   Response,
// //   Headers,
// //   Request,
// // } from '@angular/http';


// import {
//   HttpRequest,
//   HttpHandler,
//   HttpEvent,
//   HttpInterceptor
// } from '@angular/common/http';


// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
// import 'rxjs/Rx';

// /*
//   Generated class for the HttpInterceptorProvider provider.

//   See https://angular.io/docs/ts/latest/guide/dependency-injection.html
//   for more info on providers and Angular DI.
// */
// @Injectable()
// export class HttpInterceptorProvider implements HttpInterceptor {

//   constructor() {
//     //  super(backend, defaultOptions);
  
//   }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const dupReq = req.clone({ headers: req.headers.set(‘Consumer-Secret’, ‘some sample key’) });
//     return next.handle(dupReq);
//   }

//   // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
//   //   request = request.clone({
//   //     setHeaders: {
//   //       Authorization: `Bearer ${this.auth.getToken()}`
//   //     }
//   //   });
//   //   return next.handle( request);
//   // }

//   // request(url: any | Request, options?: RequestOptionsArgs): Observable<Response> {

//   //   // console.log(Request);

//   //   let token =  '';
//   //   if (typeof url === 'string') { // meaning we have to add the token to the options, not in url
//   //     if (!options) {
//   //       // let's make option object
//   //       options = { headers: new Headers() };
//   //     }
      
//   //   } else {
      
//   //    if (token) {
//   //      console.log(token);
//   //       url.headers.set('authToken', token);
//   //     }
//   //    // url.headers.set('x-jyp-store', "zcadasdasddassd");
//   //       url.headers.set('Access-Control-Allow-Origin', '*');
//   //    // url.headers.set('Content-Type', 'application/json');
//   //     // url.headers.set('Access-Control-Allow-Origin', '*');

     
//   //   }
   
//   //   return this.intercept(super.request(url, options).timeout(20000));
//   // }

//   // post(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
//   //   return this.intercept(super.post(url, body, options));
//   //  }

//   // put(url: string, body: any, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {
    
//   //   return this.intercept(super.put(url, body, options));
//   // }
//   // get(url: string, options?: RequestOptionsArgs, noIntercept?: boolean): Observable<Response> {

//   //   // return this.intercept(super.get(url, this.requestOptions(options)));
//   //   return this.intercept(super.get(url, options));
//   // }

//   // intercept(observable: Observable<Response>): Observable<Response> {
//   //   return observable.catch((err, source) => {
//   //     if(err.name == "TimeoutError"){
//   //       err.error = true;
//   //       err.message = "Some error occured. Please try again."
      
//   //       return Observable.throw(err);
//   //     }
//   //     if (err.status == 401) {
//   //       return Observable.empty();
//   //     } else {
//   //       return Observable.throw(err);
//   //     }
//   //   })
//   //     .do((res: Response) => {


//   //       return Observable.throw(res);

//   //     }, (err: any) => {
//   //       console.log("Caught error: " + err);
//   //     })
//   //     .finally(() => {
//   //       // console.log("Finally.. delaying, though.")

//   //     });

//   // }

//   // private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
//   //   if (options == null) {
//   //     options = new RequestOptions();
//   //   }
//   //   if (options.headers == null) {
//   //     // let auth_data = JSON.parse(localStorage.getItem('auth_data'));
//   //     options.headers = new Headers({
//   //     'AUTH_ID': '',
//   //     'AUTH_TOKEN': '',
//   //     });
//   //   }
//   //   return options;
//   //   }

// }