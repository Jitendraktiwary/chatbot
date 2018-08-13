import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class HttpInterceptorProvider implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
            // get the token from a service
    console.log('Intercepting request');
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