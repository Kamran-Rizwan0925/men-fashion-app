import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../Models/ShoppingCart.model';
import { NgForm } from '@angular/forms';
import { CheckoutService } from '../checkout.service';
import { Order } from '../Models/Order.model';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cart:ShoppingCart;
  subscription:Subscription;
  cartSub:Subscription;
  items:number=0;
  msgAlert:string;
  constructor(public shoppingCartService:ShoppingCartService,
    private checkOutService:CheckoutService) {
  }

  async ngOnInit() {
    if(localStorage.getItem('cartId'))
    {
      this.subscription=(await this.shoppingCartService.getCart()).subscribe(result=>{
        this.cart=result.cart;
        this.shoppingCartService.itemsUpdated.next(this.cart.itemsCount);
        this.items=this.cart.itemsCount;
      });
    }
  }

  placeOrder(form:NgForm){
    if(form.invalid)
      return;
    const email=localStorage.getItem("email");
    const order:Order={
      cart:this.cart,
      checkout:{
        email:email,
        name:form.value.name,
        phoneNo:form.value.phoneNo,
        address:form.value.address,
        cardNo:form.value.cardNo,
        cardHolder:form.value.cardHolder,
        expires:form.value.expires,
        cvc:form.value.cvc
      }
    };
    // console.log(order);
    this.checkOutService.placeOrder(order).subscribe(result=>{
      this.msgAlert= result.message;
      document.getElementById("mybtn").click();
      this.shoppingCartService.removeCart();
     });;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
