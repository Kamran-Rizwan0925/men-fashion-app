import { ShoppingCart } from './ShoppingCart.model';

export interface Order{
 cart:ShoppingCart,
 checkout:{
  email:string,
  name:string,
  phoneNo:number,
  address:string,
  cardNo:number,
  cardHolder:string,
  expires:number,
  cvc:number
 }
}
