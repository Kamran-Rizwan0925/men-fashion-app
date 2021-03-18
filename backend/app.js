const express = require("express");
const app = express();
const bodyParser=require("body-parser");
const mongoose=require('mongoose');
const path=require("path");
//connecting to mongodb database
// local connection string = 'mongodb://localhost:27017/menFashion'
mongoose.connect('mongodb+srv://Kamran_Rizwan0925:6QBrpcNv2OM6C3vP@cluster0.vpsip.mongodb.net/menFashion?retryWrites=true&w=majority',{ useNewUrlParser: true })

.then(()=>{
  console.log('Connected to Mongo DB.')
})
.catch(()=>{
  console.log('Connection to Mongo DB failed!');
});

// const Category=require('./models/category');


app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});
app.use("/images",express.static(path.join("backend/images")));

const productRoutes=require('./routes/products');
const userRoutes=require('./routes/user');
const cartRoutes=require('./routes/shopping-cart');
const orderRoutes=require('./routes/order');
const contactRoutes=require('./routes/contact');

app.use("/api/product",productRoutes);
// app.use("/api/product/category",productRoutes);
app.use("/api/shopping-cart",cartRoutes);
app.use("/api/user",userRoutes);
app.use("/api/order",orderRoutes);
app.use("/api/contact",contactRoutes);
module.exports = app;
