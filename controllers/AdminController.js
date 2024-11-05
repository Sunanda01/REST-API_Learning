const Users=require("../models/UserModel");

const AdminController={
    async getAllUsers (req,res,next){
        try{
            const result=await Users.find();
            res.status(200).json(result);
        }catch(err){next(err)}
    },
    async adminAccess(req,res,next){
        try{
            const {UserID}=req.params
            const User=await Users.findByIdAndUpdate(UserID,{$set:{isAdmin:true}},{new:true});
            res.status(201).json(User);
        }catch(err){next(err)}
    },
    async onlyUsers(req,res,next){
        try{
            const {email}=req.query;
            if(email!==undefined){
                const users=await Users.find({isAdmin:false,email:email});
                return res.status(200).json(users);
            }
            const users=await Users.find({isAdmin:false});
            return res.status(200).json(users);
        }catch(err){
            next(err);
        }
    },
    async onlyUsersCount(req,res,next){
        try{
            const users=await Users.countDocuments({isAdmin:false});
            return res.status(200).json({"Count":users});
        }catch(err){
            next(err);
        }
    }

}
module.exports=AdminController;