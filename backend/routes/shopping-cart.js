const express=require('express');
const router=express.Router();
const {ShoppingCart}=require('../models/shopping-cart');
const {Item}=require('../models/shopping-cart');

const Product=require('../models/product');
//to add a cart object in db
router.post("",(req,res,next)=>{
  const cart= new ShoppingCart({
    dateCreated:req.body.dateCreated,
    itemsCount:req.body.itemsCount,
    itemsTotalPrice:req.body.itemsTotalPrice
  });
  cart.save().then((createdcart)=>{
    res.status(201).json({
      message:'Cart added sucessfully!',
      cart:{
        id:createdcart._id,
        dateCreated:createdcart.dateCreated,
        itemsCount:1,
        itemsTotalPrice:createdcart.itemsTotalPrice
      }
    });
    console.log(cart);
  });
});

//to get single cart object from database
router.get("/:id",(req, res, next) => {
  ShoppingCart.findById(req.params.id).then(cart=>{
    if(cart){
      res.status(200).json({
        message:"Cart found!",
        cart:{
          id:cart._id,
          dateCreated:cart.dateCreated,
          items:cart.items,
          itemsCount:cart.itemsCount,
          itemsTotalPrice:cart.itemsTotalPrice
        }
      });
    }
    else{
      res.status(404).json({message:"Cart not found!"});
    }
  });
});

router.put("/:id",(req, res, next) =>{

  const prod=new Product({
  _id:req.body.id,
  name:req.body.name,
  quantity:req.body.quantity,
  price:req.body.price,
  category:req.body.category,
  imagePath:req.body.imagePath
  });

  ShoppingCart.findById(req.params.id).then(cart=>{
    if(cart){
    const item=new Item({
      product:prod,
      quantity:1,
      _id:prod._id
    });
      cart.items.push(item);
      cart.itemsCount=cart.items.length;
      let totalPrice=0;
      for(let i=0;i<cart.items.length;i++)
      {
        totalPrice=totalPrice+cart.items[i].product.price;
      }
      cart.itemsTotalPrice=totalPrice;
      cart.save().then(updatedCart=>{
      console.log(updatedCart);
      res.status(200).json({message:"Product added to cart!",itemsCount:updatedCart.itemsCount});
    });

  }
  else{
    console.log("Cart  Not found!");
    res.status(404).json({message:"Cart not found!"});
  }

});
});
router.put("/items/:cartId",(req, res, next) =>{

  ShoppingCart.findById(req.params.cartId).then(cart=>{
    if(cart){
      prodId=req.body.id;
      // console.log(prodId);
      for(let i=0;i<cart.items.length;i++)
      {
        if(prodId==cart.items[i].product._id)
        {
          cart.itemsTotalPrice-=cart.items[i].product.price;
          cart.items.splice(i,1);
          // console.log("heloo");
          // console.log(cart.items[i].product.price);

          console.log(cart.items);
          break;
        }
      }
      cart.itemsCount=cart.items.length;
      cart.save().then(updatedCart=>{
      // console.log(updatedCart);
      res.status(200).json({message:"Product removed from cart!",
      cart:updatedCart});
    });
  }
  else{
    console.log("Cart  Not found!");
    res.status(404).json({message:"Cart not found!"});
  }

});
});
module.exports = router;
