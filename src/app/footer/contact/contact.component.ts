import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Message } from 'src/app/Models/Message.Model';
import { ContactService } from 'src/app/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  msgAlert:string;
  constructor(private contactService:ContactService) { }

  ngOnInit() {
  }
  contactInfo(form:NgForm){
    if(form.invalid){
      return;
    }
    const contactMsg:Message={
      _id:null,
      name:form.value.name,
      subject:form.value.subject,
      message:form.value.message,
      email:form.value.email
    }
    // console.log(contactMsg);
    this.contactService.addMessage(contactMsg).subscribe(result=>{
     this.msgAlert= result.message;
     document.getElementById("mybtn").click();
    });

  }
}
