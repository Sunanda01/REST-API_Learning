const Joi=require('joi');
const schema=Joi.object({
    name:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(5).required(),
    isAdmin:Joi.boolean().required()
});

const validateUser=async(user)=>{
    try{
        const value=await schema.validateAsync(user);
        return {value};
    }
    catch(err){
        return{error:err};
    };
};
module.exports=validateUser;