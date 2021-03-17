import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token:string;
  private tokenTimer:any;
  private isAuthenticated=false;
  private authStatusListener=new Subject<boolean>();

  private user:AuthData={email:"",password:"",isAdmin:false};
  private user$=new Subject<AuthData>();

  message$=new Subject<string>();
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute) { }
  createUser(user){
    const authData:AuthData={
      email:user.email,
      password:user.password,
      isAdmin:user.isAdmin
    }
    this.http.post<{message:string}>('http://localhost:3000/api/user/signup',authData)
    .subscribe(response=>{
      // console.log(response);
      // alert(response.message);
      this.message$.next(response.message);
      // if(response.message=="User created!")
      {
        // this.message$.next(response.message);
        // this.router.navigate(['login']);
      }

    });
  }
  getUser(){
    return this.user;
  }
  getIsAdmin(){
    return this.user.isAdmin;
  }
  getUserObservable(){
    return this.user$.asObservable();
  }
  getToken(){
    return this.token;
  }
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }
  getIsAuth(){
    return this.isAuthenticated;
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);

      this.authStatusListener.next(true);
      this.user.email=authInformation.email;
      if(this.user.email=="menFashion@gmail.com")
        this.user.isAdmin=true;
      this.user$.next(this.user);
    }
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const email=localStorage.getItem("email");
    if (!token || !expirationDate || !email) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      email:email
    }
  }
  getMessage(){
    return this.message$.asObservable();
  }
  login(user){
    const authData:AuthData={
      email:user.email,
      password:user.password,
      isAdmin:user.isAdmin
    };
    let returnUrl=this.route.snapshot.queryParamMap.get('returnUrl')||'/';
    localStorage.setItem('returnUrl',returnUrl);
    localStorage.setItem('email',this.user.email);
    // localStorage.setItem('isAdmin',this.user.isAdmin);

    this.http.post<{token:string,expiresIn:number,user:AuthData,message:string}>('http://localhost:3000/api/user/login',authData)
    .subscribe(response=>{
      // console.log(response);
      if(response.message=="User does not exist for this email!")
      {
        // alert(response.message);
        this.message$.next(response.message);
        this.message$.next("Please register if you have not sign up yet!");
        // alert("Please register if you have not sign up yet!");
        return;
      }
      else if(response.message=="User does not exist for this password!")
      {
        // alert(response.message);
        this.message$.next(response.message);
        this.message$.next("Please enter correct password!");
        // alert("Please enter correct password!");
        return;
      }
      this.token=response.token;
      if(this.token)
      {
        this.user=response.user;
        this.user$.next(response.user);
        // console.log(response.user);
        const expiresInDuration=response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated=true;
        this.authStatusListener.next(true);
        const now=new Date();
        const expirationDate=new Date(now.getTime()+expiresInDuration*1000);
        this.saveAuthData(this.token,expirationDate);

        if(response.user.isAdmin && returnUrl=='/admin/admin-products')
          this.router.navigate([returnUrl]);

        else
          this.router.navigate(['/']);
        // this.router.navigate(['/']);
      }
      else
      {
          // alert(response.message);
          // console.log(response.message);
      }
    });
  }
  private saveAuthData(token:string,expirationDate:Date){
    localStorage.setItem("token",token);
    localStorage.setItem("expiration",expirationDate.toISOString());
    localStorage.setItem("email",this.user.email);
  }
  logout(){
    this.token=null;
    this.user={email:"",password:"",isAdmin:false};
    this.isAuthenticated=false;
    this.authStatusListener.next(false);
    this.user$.next(this.user);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    //next is used to pass the value to the components to update them.
    this.router.navigate(['/']);

  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("email");
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }
}
