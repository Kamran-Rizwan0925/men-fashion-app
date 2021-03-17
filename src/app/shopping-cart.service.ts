import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import 'rxjs/add/operator/toPromise';
import { ShoppingCart } from './Models/ShoppingCart.model';
import { Product } from './Models/Product.model';
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private http:HttpClient) { }
  public itemsUpdated = new Subject<Number>();
  public shoppingCart=new Subject<ShoppingCart>();

  getItemsUpdateListener() {
    return this.itemsUpdated.asObservable();
  }
  getShoppingCartUpdateListener(){
    return this.shoppingCart.asObservable();
  }
  //to creat a shopping cart and pass it to the server
  private create()
   {
    let obj:ShoppingCart={id:null,dateCreated:new Date().getTime(),items:null,itemsCount:1,itemsTotalPrice:0};
    return this.http.post<{message:string,cart:ShoppingCart}>('http://localhost:3000/api/shopping-cart/',obj).toPromise();
  }

  //getting a shopping cart from db
   async getCart(){
    // let cartId=await this.getOrCreateCartId();
    let cartId=localStorage.getItem('cartId');
    if(cartId)
    return this.http.get<{message:string,cart:ShoppingCart}>('http://localhost:3000/api/shopping-cart/'+cartId);
  }

  async getOrCreateCartId():Promise<string>
  {
    let cartId=localStorage.getItem('cartId');
    if(cartId)
      return cartId;

    let result=await this.create();
    localStorage.setItem('cartId',result.cart.id);
    return result.cart.id;

  }

  putItemInCart(cartId:string,product:Product){
    return this.http.put<{message:string,itemsCount:number}>('http://localhost:3000/api/shopping-cart/'+cartId,product);
  }

  async addToCart(product:Product)
  {
    let cartId=await this.getOrCreateCartId();
    this.putItemInCart(cartId,product).subscribe(res=>{
      console.log(res);
      this.itemsUpdated.next(res.itemsCount);
    });
  }
  public async removeItem(prodId:String){
    let cartId=await this.getOrCreateCartId();
    return this.http.put<{message:string,cart:ShoppingCart}>('http://localhost:3000/api/shopping-cart/items/'+cartId,{id:prodId});
  }
  removeCart(){
    localStorage.removeItem('cartId');
    this.shoppingCart.next(null);
    this.itemsUpdated.next(null);
  }
}
