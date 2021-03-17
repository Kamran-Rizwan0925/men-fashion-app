const mongoose=require('mongoose');

const orderSchema=mongoose.Schema({
  cart:{type:Array,required:true},
  email:{type:String,required:true},
  name:{type:String,required:true},
  phoneNo:{type:Number,required:true},
  address:{type:String,required:true},
  cardNo:{type:Number,required:true},
  cardHolder:{type:String,required:true},
  expires:{type:Number,required:true},
  cvc:{type:Number,required:true}
});

module.exports=mongoose.model('Order',orderSchema);
