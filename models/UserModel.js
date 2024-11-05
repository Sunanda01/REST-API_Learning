const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String, required:true, unique:true},
    password:{type:String, required:true, minlength:4},
    isAdmin:{type:Boolean, default :false},
},{timestamp:true});

// const User=mongoose.model("User",UserSchema);
module.exports=mongoose.model("Users",UserSchema);