const express=require('express');
const router=express.Router();
const Contact=require('../models/contact');

router.post("",(req,res,next)=>{
    const contactMsg=new Contact({
        name:req.body.name,
        message:req.body.message,
        subject:req.body.subject,
        email:req.body.email,
      });
      contactMsg.save()
      .then((result)=>{
        res.status(201).json({
          message:"Message Has Been Recieved!",
        });
        console.log(result);
        console.log("Message added to database successfully!");
      });
});

router.get("",(req,res,next)=>{
  Contact.find().then(documents=>{
    console.log("Messages found successfully from Database!");
    res.status(200).json({
      messages:documents
    });
  });
});

router.delete("/:id",(req, res, next) =>{

  // console.log(req.params.id);
  Contact.deleteOne({_id:req.params.id}).then((result)=>{
    // console.log(result);
    res.status(200).json({
      messages:result
    });
  });

  });
module.exports = router;
