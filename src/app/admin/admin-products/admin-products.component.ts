import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { Product } from 'src/app/Models/Product.model';
import { Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit,OnDestroy {
  rowsOnPage=[5,10,25,50];
  products:any=[];
  private prodSub: Subscription;
  // prod$ = new Subject<any>();
    // {name:"Hi",price:32,quantity:45,category:"Shirts"}
  constructor(public productService:ProductService) {
  }

  async ngOnInit() {
    // this.products=this.productService.getAllProducts();
    this.productService.getAllProducts();
    //this.products=this.productService.getPostUpdateListener();
    this.prodSub = this.productService.getProductsUpdateListener()
      .subscribe((prod: Product[]) => {
        this.products = prod;
        // this.filter("sh");
        // console.log(this.products);
      });
    // this.products.push()
    // console.log(this.products);

  }
  onDelete(prodId:string){
    if(!confirm('Are you sure you want to delete this product?'))
      return;
    // console.log(prodId);
    this.productService.deleteProduct(prodId);
    // this.prod$.next( this.products);
  }
  ngOnDestroy(){
    this.prodSub.unsubscribe();
  }

    // filter(query:string) {
    //     this.prod$.next(query ? this.products.filter(_ => _.name.includes(query)):this.products);
    // }

  }
