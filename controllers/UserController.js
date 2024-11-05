const userModel=require("../models/UserModel");
const UserControl={
    async deleteprofile(req,res,next){
        try{
            const getUser=req.user.id;
        const delUser=await userModel.findByIdAndDelete(getUser);
        return res.status(200).json(delUser);
    }catch(err){
        next(err);
    }
    }
}
module.exports=UserControl;