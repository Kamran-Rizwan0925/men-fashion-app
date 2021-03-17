import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../Models/Product.model';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../Models/ShoppingCart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product:Product;
  @Input('shopping-cart') shoppingCart;

  constructor(private cartService:ShoppingCartService) { }
  showCartBtn:Boolean=true;
  addToCart(product:Product){
    this.cartService.addToCart(product);
    this.showCartBtn=false;
  }
 ngOnChanges()
   //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
   //Add '${implements OnChanges}' to the class.

 {

    if(!this.shoppingCart)
    {
      // console.log(this.product);
      return;
    }

    for(let i=0;i<this.shoppingCart.items.length;i++)
    {
      if(this.product.id==this.shoppingCart.items[i]._id)
      {
        // console.log(this.shoppingCart.items[i]);
        this.showCartBtn=false;
      }
    }

  }
}
