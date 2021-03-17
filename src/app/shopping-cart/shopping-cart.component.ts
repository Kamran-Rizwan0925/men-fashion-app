import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../shopping-cart.service';
import { Subscription } from 'rxjs';
import { ShoppingCart } from '../Models/ShoppingCart.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart:ShoppingCart;
  subscription:Subscription;
  cartSub:Subscription;
  items:number=0;
  constructor(public shoppingCartService:ShoppingCartService) { }

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
  async onRemove(prodId:String){
    // console.log(prodId);
    this.cartSub=(await this.shoppingCartService.removeItem(prodId)).subscribe(res=>{
      console.log(res.message);
      const c:ShoppingCart={
        id:res.cart.id,
        dateCreated:res.cart.dateCreated,
        itemsCount:res.cart.itemsCount,
        items:res.cart.items,
        itemsTotalPrice:res.cart.itemsTotalPrice
      };
    this.cart=c;
    this.shoppingCartService.itemsUpdated.next(this.cart.itemsCount);
    this.items=this.cart.itemsCount;
    });
  }

}
