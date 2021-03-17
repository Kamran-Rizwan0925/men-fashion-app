import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthData } from '../auth-data.model';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public authService:AuthService) { }
message:string;
  ngOnInit() {
  }
  login(form:NgForm){
    if(form.invalid)
      return;
    const userData:AuthData={
      email:form.value.email,
      password:form.value.password,
      isAdmin:false
    };
    this.authService.login(userData);
    this.authService.getMessage()
    .subscribe((message)=>{
      this.message=message;
      document.getElementById("mybtn").click();
    });
    // console.log(userData);
  }
}
