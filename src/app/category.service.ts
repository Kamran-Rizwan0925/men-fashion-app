import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Subject } from "rxjs";
import { Product } from './Models/Product.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private products:Product[]=[];
  private productsUpdated = new Subject<Product[]>();



  constructor(private http:HttpClient) { }

  getAllProducts(){
    this.http.get<{message:string,products:any}>('http://localhost:3000/api/product')
    .pipe(map(productData=>{
      return productData.products.map(p=>{
        return {
          id:p._id,
          name:p.name,
          quantity:p.quantity,
          price:p.price,
          category:p.category,
          imagePath:p.imagePath
        };
      });
    }))
    .subscribe(transformedProducts=>{

    this.products=transformedProducts;
    this.productsUpdated.next([...this.products]);
    // console.log(this.products);
    // this.products=[{id:null,name:"Hi",price:32,quantity:45,category:"Shirts"}];
    // console.log(this.products);

    return this.products;
    });
  }
}
