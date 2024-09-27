const mongoose=require ('mongoose');
const ProductSchema=new mongoose.Schema({
    name:{type:String, required:true},
    price:{type:Number, required:true},
    qty:{type:Number, required:true},
    img:{type:String}
})
// const Product=mongoose.model("Product",ProductSchema);
// module.exports= Product;
module.exports=mongoose.model("Products",ProductSchema);