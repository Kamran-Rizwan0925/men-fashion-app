const mongoose=require('mongoose');

const pantsSchema = mongoose.Schema({ name: String });
const shirtsSchema = mongoose.Schema({ name: String });
const hatsSchema = mongoose.Schema({ name: String });
const watchesSchema = mongoose.Schema({ name: String });

var categorySchema = mongoose.Schema({

  pants: pantsSchema,
  shirts:shirtsSchema,
  hats:hatsSchema,
  watches:watchesSchema
});
module.exports=mongoose.model('Categories',categorySchema);
