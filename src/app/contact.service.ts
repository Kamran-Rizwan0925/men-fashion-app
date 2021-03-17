import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './Models/Message.Model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  messages:Message[];

  constructor(private http:HttpClient) { }

  addMessage(contactMsg:Message){
    return this.http.post<{message:string}>("http://localhost:3000/api/contact",contactMsg);

  }

  getMessages(){
    return this.http.get<{messages:any}>('http://localhost:3000/api/contact');
  }
  deleteMsg(id:string){
    return this.http.delete<{messages:any}>('http://localhost:3000/api/contact/'+id);
  }
}
