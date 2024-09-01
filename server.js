const express=require("express")

const app=express();
// app.use(express.json());

app.post("/",(req,res)=>{
    try{
        console.log("API hit");
       return  res.status(200).json({msg:"API WORKS PERFECTLY"});
    }catch(err){
        console.log(err)
        
    }
})

app.listen(8000,()=>{
    console.log("Server is running !!!");
})