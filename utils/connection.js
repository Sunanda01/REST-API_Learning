const mongoose=require ("mongoose")
const DB_URL=require("../config/secret").DB_URL
const connection=async()=>{
    try{ 
    await mongoose.connect(DB_URL);
    console.log("DB Connected successfully");
    }
    catch(err){
        console.log(err);
    }
}

module.exports=connection;