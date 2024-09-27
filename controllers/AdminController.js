const Users=require("../models/UserModel");

const AdminController={
    async getAllUsers (req,res,next){
        try{
            const result=await Users.find();
            res.status(200).json(result);
        }catch(err){next(err)}
    }
}
module.exports=AdminController;