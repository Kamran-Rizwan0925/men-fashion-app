const express=require('express');
const router=express.Router();
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

//sign up for a user
router.post("/signup",(req,res,next)=>{
  //to check if user already exists or not!
  User.findOne({email:req.body.email})
  .then(result=>{
    if(result)
    {
      res.status(201).json({
        message:"Please select another email!",
        result:result})
    }
    else
    {
      //create new user
      bcrypt.hash(req.body.password,10)
      .then(hash=>{
      const user=new User({
        email:req.body.email,
        password:hash,
        isAdmin:req.body.isAdmin
      });
      user.save()
      .then(result=>{
        res.status(201).json({
          message:"Sign up Successful! Login now.",
          result:result
        });
        console.log("User added to database successfully!");
      })
      .catch(err=>{
        res.status(200).json({
          error:err,
          message:"Password does not match!"
          });
        });
      });
    }
  });
});

//login the user
router.post("/login",(req,res,next)=>{
  let fetchedUser;
  User.findOne({email:req.body.email})
  .then(user=>{
    // console.log(user);
    if(!user){
    return res.status(200).json({message:"User does not exist for this email!"});
    }
    fetchedUser=user;
    return bcrypt.compare(req.body.password,user.password);})
  .then(result=>{
    // console.log(result);
    if(!result)
    {
      return res.status(200).json({message:"User does not exist for this password!"});
    }
    const token=jwt.sign({
      email:fetchedUser.email,
      userId:fetchedUser._id,
      isAdmin:fetchedUser.isAdmin
    }
    ,'secret_this_should_be_longer'
    ,{
        expiresIn:"1h"
    });
    //  console.log(token);
    res.status(200).json({
      token:token,
      expiresIn:3600,
      user:fetchedUser
    });
  })
  .catch(err=>{
  return res.status(200).json({message:"User does not exist!"});
 });
});

module.exports = router;
