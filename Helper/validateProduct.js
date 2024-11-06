const Joi=require('joi');
const productSchema=Joi.object({
    name:Joi.string().required(),
    price:Joi.number().required(),
    qty:Joi.number().required(),
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