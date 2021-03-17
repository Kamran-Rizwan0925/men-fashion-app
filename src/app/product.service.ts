import { Injectable } from '@angular/core';
import { Product } from './Models/Product.model';
import { HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import { Subject } from "rxjs";
import { Router } from '@angular/router';//to navigate routes programmatically



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products:Product[]=[];
  private productsUpdated = new Subject<Product[]>();

  constructor(private http:HttpClient,private router:Router) {}

  //to pass a product to the node js server
  addProduct(product,image:File){
    // const prod:Product={id:null,name:product.name,quantity:product.quantity,price:product.price,category:product.category};
    const productData=new FormData();
    productData.append("id",null);
    productData.append("name",product.name);
    productData.append("quantity",product.quantity);
    productData.append("price",product.price);
    productData.append("category",product.category);
    productData.append("image",image,product.name);
    this.http.post<{message:string,product:Product}>('http://localhost:3000/api/product',productData)
    .subscribe((responseData)=>{
      console.log(responseData.message);
      const prod:Product={
        id:responseData.product.id,
        name:product.name,
        quantity:product.quantity,
        price:product.price,
        category:product.category,
        imagePath:responseData.product.imagePath
      };

      this.products.push(prod);
      this.productsUpdated.next([...this.products]);
      this.router.navigate(["/admin/admin-products"]);//to redirect the user to admin product page programmatically.
      // console.log(this.products);
    });
    // console.log(product);
  };

  getProductsUpdateListener() {
    return this.productsUpdated.asObservable();
  }

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

  getAll(){
  return  this.http.get<{message:string,products:any}>('http://localhost:3000/api/product')
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
    }));
    // .subscribe(transformedProducts=>{

    // this.products=transformedProducts;
    // this.productsUpdated.next([...this.products]);

    // return this.products;
    // });
  }

  //get single product
  getProduct(id:string){
    // return {...this.products.find(p=>p.id===id)};
    console.log("hi");
    return this.http.get<{message:string,product:any}>('http://localhost:3000/api/product/'+id);
    // .pipe(map(res=>{
    //   return res.product.map(p=>{
    //     return {
    //       id:p._id,
    //       name:p.name,
    //       quantity:p.quantity,
    //       price:p.price,
    //       category:p.category,
    //       imagePath:p.imagePath
    //     };
    //   });
    // }));
  }


  //get all products of same category
  getAllProductsOfCategory(category:string){

    this.http.get<{message:string,products:any}>('http://localhost:3000/api/product/category/'+category)
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
  //delete product
  deleteProduct(id:string){
    this.http.delete('http://localhost:3000/api/product/'+id).subscribe(()=>{
      // console.log('Product Deleted!');
      const updatedProducts=this.products.filter(prod=>prod.id!==id);
      this.products=updatedProducts;
      this.productsUpdated.next([...this.products]);
    });
  }

  //updating product
  updateProduct(id:string,product,image:File|string){
    // const prod:Product={
    //   id:id,
    //   name:product.name,
    //   quantity:product.quantity,
    //   price:product.price,
    //   category:product.category,
    //   imagePath:null
    // };
    let productData:Product | FormData;
    if(typeof(image === 'object')){
      productData=new FormData();
      productData.append('id',id);
      productData.append('name',product.name);
      productData.append("price",product.price);
      productData.append("quantity",product.quantity);
      productData.append("category",product.category);
      productData.append("image",image,product.name);
    }
    else{
       productData={
          id:id,
          name:product.name,
          quantity:product.quantity,
          price:product.price,
          category:product.category,
          imagePath:<string>image
        };
    }
    this.http.put('http://localhost:3000/api/product/'+id,productData)
    .subscribe(response=>{
      // console.log(response);
      const updatedProducts=[...this.products];
      const oldProdIndex=updatedProducts.findIndex(p=>p.id===id);
      const prod:Product={
        id:id,
        name:product.name,
        quantity:product.quantity,
        price:product.price,
        category:product.category,
        imagePath:""      };
      updatedProducts[oldProdIndex]=prod;
      this.products=updatedProducts;
      this.productsUpdated.next([...this.products]);
      this.router.navigate(["/admin/admin-products"]);//to redirect the user to admin product page programmatically.

    });
  }
}
