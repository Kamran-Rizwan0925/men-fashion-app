import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/product.service';
import { FormGroup, FormControl ,Validators} from '@angular/forms';
// Not using template dirven form anymore
// import { NgForm } from '@angular/forms';
import { Product } from 'src/app/Models/Product.model';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {mimeType} from './mime-type.validator';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  // categories$;
  private mode='create';
  private prodId:string;
  prod:Product;
  form:FormGroup;
  imagePreview:string;


  isLoading=true;//for spinner not implemented yet!
  constructor(private productService:ProductService,public route:ActivatedRoute) {
    // this.categories$=this.categoryService.getCategories();
    // console.log(this.categories$);
   }

  ngOnInit() {
    //creating a new form group object
    this.form=new FormGroup({
      'name':new FormControl(null,{validators:[Validators.required]}),
      'quantity':new FormControl(null,{validators:[Validators.required,Validators.min(0)]}),
      'price':new FormControl(null,{validators:[Validators.required,Validators.min(0)]}),
      'category':new FormControl(null,{validators:[Validators.required]}),
      'image':new FormControl(null,{validators:[Validators.required], asyncValidators:[mimeType]})
    });
    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('prodId')){
        this.mode='edit';
        this.prodId=paramMap.get('prodId');
        this.productService.getProduct(this.prodId)
        .subscribe(res=>{
          //when we have done getting the products we hide the spinner
          // this.isLoading=false; this is for spinner not implemented yet!
          this.prod={
            id:res.product._id,
            name:res.product.name,
            quantity:res.product.quantity,
            price:res.product.price,
            category:res.product.category,
            imagePath:res.product.imagePath
          };
          this.form.setValue({
            'name':this.prod.name,
            'quantity':this.prod.quantity,
            'price':this.prod.price,
            'category':this.prod.category,
            'image':this.prod.imagePath
            });
            this.imagePreview=res.product.imagePath;
        });
      }
      else{
        this.mode='create';
        this.prodId=null;
      }
    });
  }
  saveProduct(){
    if(this.form.invalid)
      return;
    const product:Product = {
      id:null,
      name:this.form.value.name,
      quantity:this.form.value.quantity,
      price:this.form.value.price,
      category:this.form.value.category,
      imagePath:null
    };
    if(this.mode==='create')
    {
      this.productService.addProduct(product,this.form.value.image);
      console.log(product);
    }
    else if(this.mode==='edit'){
      this.productService.updateProduct(this.prodId,product,this.form.value.image);
    }
  }

  onImagePicked(event:Event){
    //to access the input element file
    const file=(event.target as HTMLInputElement).files[0];
    //patchvalue:to patch a single form control
    this.form.patchValue({'image':file});
    //to update form control value and also check for validity
    this.form.get('image').updateValueAndValidity();
    // console.log(file);
    // console.log(this.form);

    const reader=new FileReader();
    reader.onload=()=>{
      this.imagePreview=reader.result as string;
    }
    reader.readAsDataURL(file);
  }

  // onDelete(){
  //   if(!confirm('Are you sure you want to delete this product?'))
  //     return;
  //   this.productService.deleteProduct("5db4636990a14834e825df39");
  // }
  // uploadImage(event:Event){
  //   const file=(event.target as HTMLInputElement).files[0];
  //   console.log(file);
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  // }
}
