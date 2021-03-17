import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { from } from 'rxjs';
import { AuthData } from '../auth-data.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public authService:AuthService) { }
  message:string;
  ngOnInit() {
  }
  signup(form:NgForm){
    if(form.invalid){
      return;
    }
    const userData:AuthData={
      email:form.value.email,
      password:form.value.password,
      isAdmin:false
    };
    if(userData.email==="menFashion@gmail.com"
    && userData.password==="123")
    {
      userData.isAdmin=true;
    }

    this.authService.createUser(userData);
    this.authService.getMessage()
    .subscribe((message)=>{
      this.message=message;
      document.getElementById("mybtn").click();
    });
  }
}
