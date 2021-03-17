const express=require('express');
const router=express.Router();

const Product=require('../models/product');
const checkAuth=require('../middleware/check-auth');
const multer=require('multer');//use for file uploading
//defining image formats that can be uploaded into backend
const MIME_TYPE_MAP={
  "image/png":"png",
  "image/jpg":"jpg",
  "image/jpeg":"jpg",
};
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid MIME Type!");
    if(isValid){
      error=null;
    }
    cb(error,"backend/images");
  },
  filename:(req,file,cb)=>{
    const name=file.originalname.toLowerCase().split(" ").join();
    const ext=MIME_TYPE_MAP[file.mimetype];//for extension
    cb(null,name + "-" + Date.now() + "." + ext);
  }
});
router.post("",checkAuth,multer({storage:storage}).single("image"),(req,res,next)=>{
  const url= req.protocol + "://" + req.get("host");
  const product= new Product({
    name:req.body.name,
    quantity:req.body.quantity,
    price:req.body.price,
    category:req.body.category,
    imagePath:url + "/images/" + req.file.filename
  });
  product.save().then((createdProduct)=>{
    res.status(201).json({
      message:'Product added sucessfully!',
      product:{
        id:createdProduct._id,
        name:createdProduct.name,
        price:createdProduct.price,
        quantity:createdProduct.quantity,
        category:createdProduct.category,
        imagePath:createdProduct.imagePath
      }
    });
     // console.log(product);
  });


});

//to get all products
router.get("",(req, res, next) => {
Product.find().then(documents=>{
  console.log("Products found successfully from Database!");
  // console.log(documents);
  res.status(200).json({
    message:"Products fetched successfully!",
    products:documents
  });
  // res.send(documents);
});
});

//to get single product
router.get("/:id",(req, res, next) => {
  // console.log(req.params.id);
Product.findById(req.params.id).then(prod=>{
  if(prod){
    res.status(200).json({product:prod});
  }
  else{
    res.status(404).json({message:"Product not found!"});
  }
});

});


router.get("/category/:category",(req, res, next) => {
  // console.log(category);
  Product.find({category:req.params.category}).then(documents=>{
    // console.log("Products found successfully from Database!");
    // console.log(documents);
    res.status(200).json({
      message:"Products fetched successfully!",
      products:documents
    });
    // res.send(documents);
  });
  });


router.delete("/:id",checkAuth,(req, res, next) =>{

// console.log(req.params.id);
Product.deleteOne({_id:req.params.id}).then((result)=>{
  // console.log(result);
  res.status(200).json({
    message:"Product deleted!"
  });
});

});

router.put("/:id",checkAuth,multer({storage:storage}).single("image"),(req, res, next) =>{
  let imagePath=req.body.imagePath;
  if(req.file){
  const url= req.protocol + "://" + req.get("host");
  imagePath=url + "/images/" + req.file.filename;
 }
  const prod=new Product({
  _id:req.body.id,
  name:req.body.name,
  quantity:req.body.quantity,
  price:req.body.price,
  category:req.body.category,
  imagePath:imagePath
});
Product.updateOne({_id:req.params.id},prod).then(result=>{
  // console.log(result);
  res.status(200).json({
    message:"Updated successfully!",

  });
});

});
// router.use("/api/posts", (req, res, next) => {
//   const posts = [
//     {
//       id: "fadf12421l",
//       title: "First server-side post",
//       content: "This is coming from the server"
//     },
//     {
//       id: "ksajflaj132",
//       title: "Second server-side post",
//       content: "This is coming from the server!"
//     }
//   ];
//   res.status(200).json({
//     message: "Posts fetched succesfully!",
//     posts: posts
//   });
// });

module.exports = router;
