import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Order } from './Models/Order.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  public ordersUpdated=new Subject<Order[]>();
  constructor(private http:HttpClient) { }
  getOrderssUpdateListener() {
    return this.ordersUpdated.asObservable();
  }
  placeOrder(order:Order)
  {
    return this.http.post<{message:string}>("http://localhost:3000/api/order",order);
  }
  getOrders(){
    return this.http.get<{orders:Order[]}>('http://localhost:3000/api/order');
  }
  deleteOrder(id:string){
    return this.http.delete<{orders:Order[]}>('http://localhost:3000/api/order/'+id);
  }
}
