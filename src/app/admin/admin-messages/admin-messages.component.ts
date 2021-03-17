import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/contact.service';
import { Message } from 'src/app/Models/Message.Model';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {
  messages:Message[]=[];
  constructor(private contactService:ContactService) { }

  ngOnInit() {
   this.contactService.getMessages().subscribe(response=>{
    this.messages=response.messages;
    // console.log(this.messages);
  });;
  }
  deleteMsg(id:string){
    console.log(id);
    this.contactService.deleteMsg(id).subscribe(response=>{
      this.messages=response.messages;
      // console.log(this.messages);
    });;
  }

}
