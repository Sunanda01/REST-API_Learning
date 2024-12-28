const userModel=require("../models/UserModel");
const client=require('../utils/RedisClient');
const UserControl={
    async deleteprofile(req,res,next){
        try{
            const getUser=req.user.id;
        const delUser=await userModel.findByIdAndDelete(getUser);
        return res.status(200).json(delUser);
    }catch(err){
        next(err);
    }
    },
    async getUser(req,res){
        try{
            let check=await client.get("Reddis");
            if(check){
                check=JSON.parse(check);
                console.log("Fetching from RedisDB!!!!!!");
                return res.status(200).json({msg:check});
            }
            const userDetails=await userModel.find();
            const result=userDetails.map(item=>({
                name:item.name,
                email:item.email
            }))
            await client.set("Reddis",JSON.stringify(result));
            console.log("Saving in RedisDB!!!!!!!!");
            return res.status(200).json(result);
        }catch(err){
            console.log(err);
            console.log("Error in fetching data");
            return res.status(500).json({ error: "An error occurred" });
        }
    }
}
module.exports=UserControl;