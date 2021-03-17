const express=require('express');
const router=express.Router();
const Order=require('../models/order');

router.post("",(req,res,next)=>{
    const order=new Order({
        cart:req.body.cart,
        email:req.body.checkout.email,
        name:req.body.checkout.name,
        phoneNo:req.body.checkout.phoneNo,
        address:req.body.checkout.address,
        cardNo:req.body.checkout.cardNo,
        cardHolder:req.body.checkout.cardHolder,
        expires:req.body.checkout.expires,
        cvc:req.body.checkout.cvc,
      });
      order.save()
      .then((result)=>{
        res.status(201).json({
          message:"Your Order Has Been Recieved!",
        });
        console.log(result);
        console.log("Order added to database successfully!");
      });
});

router.get("",(req,res,next)=>{
  Order.find().then(documents=>{
    console.log("Orders found successfully from Database!");
    res.status(200).json({
      orders:documents
    });
  });
});

router.delete("/:id",(req, res, next) =>{

  // console.log(req.params.id);
  Order.deleteOne({_id:req.params.id}).then((result)=>{
    // console.log(result);
    Order.find().then(documents=>{
      console.log("Orders found successfully from Database!");
      res.status(200).json({
        orders:documents
      });
    });
  });

  });
module.exports = router;
