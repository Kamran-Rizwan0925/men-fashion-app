import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/Order.model';
import { CheckoutService } from 'src/app/checkout.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders:any[]=[];
  orderSub:Subscription;
  constructor(private checkoutService:CheckoutService) { }

  ngOnInit() {
    this.checkoutService.getOrders().subscribe(response=>{
      this.orders=response.orders;
      console.log(response.orders);
    });
    this.orderSub=this.checkoutService.getOrderssUpdateListener().subscribe((orders)=>{
      console.log(orders);
      this.orders=orders;
    });
  }
  removeOrder(id:string){
    // console.log(id);
    this.checkoutService.deleteOrder(id).subscribe(response=>{
      console.log(response);
      this.checkoutService.ordersUpdated.next(response.orders);
      // this.orders=response.orders;

      // console.log(this.messages);
    });;
  }
  ngOnDestroy(): void {
    this.orderSub.unsubscribe();
  }
}
