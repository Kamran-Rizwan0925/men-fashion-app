import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../product.service';
import { Subscription } from 'rxjs';
import { Product } from '../Models/Product.model';
import { CategoryService } from '../category.service';
import { ActivatedRoute } from '@angular/router';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  cart;
  subscription:Subscription;
  products:Product[]=[];
  filteredProducts:Product[]=[];
  // private products$: Subscription;
  public category:string;
  constructor(
    public route:ActivatedRoute,
    public productService:ProductService,
    public shoppingCartService:ShoppingCartService)
  {
    this.productService.getAll()
      .subscribe((prod) => {
        this.products = prod;
        // console.log(this.products);

        this.route.queryParamMap.subscribe(params=>
          {
            this.category=params.get('category');
            // console.log(this.category);
            this.filteredProducts=this.category ?
            this.products.filter(p=>p.category===this.category):this.products;
          });
      });
   }

  async ngOnInit() {
    // this.productService.getAllProducts();
    // this.products$ = this.productService.getProductsUpdateListener()

//methods
      if(localStorage.getItem('cartId'))
      {
        this.subscription=(await this.shoppingCartService.getCart()).subscribe(result=>{
          this.cart=result.cart;
          this.shoppingCartService.itemsUpdated.next(this.cart.itemsCount);
          console.log(this.cart);
        });
      }

  }
  ngOnDestroy(){
    // this.subscription.unsubscribe();
    // this.products$.unsubscribe();
    // this.cart.unsubscribe();
  }

}
