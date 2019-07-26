import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable()
export class ApiPrefixInterceptor implements HttpInterceptor {
  private readonly prefix: string;

  constructor() {
    this.prefix = environment.apiURL;
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!/^(http|https):/i.test(request.url) && !request.url.includes('i18n')) {
      request = request.clone({ url: this.prefix + request.url });
    }
    return next.handle(request);
  }
}
