import { Product } from './Product.model';

export interface ShoppingCart{
  id:string;
  dateCreated:number;
  items:[{product:Product,quantity:number}];
  itemsCount:number;
  itemsTotalPrice:number;
}
