const mongoose=require('mongoose');
const item=mongoose.Schema({
  product:{
    _id:    { type: String },
  name:{type:String,required:true},
  quantity:{type:Number,required:true},
  price:{type:Number,required:true},
  category:{type:String,required:true},
  imagePath:{type:String,required:true}},
  quantity:Number},{_id:true});

const ItemsSchema = mongoose.model('item', item);
const ShoppingCart=mongoose.Schema({
  dateCreated:{type:String,required:true},
  items:[{type:item}],
  itemsCount:{type:Number,required:true},
  itemsTotalPrice:{type:Number,required:true}
});



const ShoppingCartSchema=mongoose.model('ShoppingCart',ShoppingCart);
module.exports={ Item: ItemsSchema, ShoppingCart:ShoppingCartSchema};
