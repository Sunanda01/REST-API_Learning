const Joi=require('joi');
const userSchema=Joi.object({
    name:Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(3).required(),
    email:Joi.string().email({minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
    password:Joi.string().required(),
    isAdmin:Joi.boolean().required()
});

const validateUser=async(user)=>{
    try{
        const value=await userSchema.validateAsync(user);
        return {value};
    }
    catch(err){
        return{error:err};
    }
};
module.exports=validateUser;