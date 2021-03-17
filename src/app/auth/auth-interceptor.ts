//interceptor are basically functions that will run for every
//outgoing request.
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
//here next is used to send the request to other parts of angular app
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authService.getToken();//to get the token
    //to make a clone copy of request and add an "Authorization" header field to it.
    //which has the token.
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken)
    });//bearer(it is optional but conventional) is just our own string concatenated to the token for how we extract data from backend


    //passing the request to other parts of angular app.
    return next.handle(authRequest);
  }
}
