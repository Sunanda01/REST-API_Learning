const Joi=require('joi');
const productSchema=Joi.object({
    name:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]+$')).min(3).required(),
    price:Joi.number().min(1).required(),
    qty:Joi.number().min(1).required(),
    img:Joi.string()
})

const validateProduct=async(product)=>{
    try{
        const value=await productSchema.validateAsync(product);
        return {value};
    }
    catch(err){
        return({error:err.details[0].message});
        }
};
module.exports=validateProduct;