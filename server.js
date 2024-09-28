const express=require("express")
const connection=require("./utils/connection")
const secret=require("./config/secret")
const REST_routes=require("./routes/routes");
const errorHandling=require("./middleware/errorHandling");
const cors=require("cors")
const app=express();


app.use(cors({ 
    origin: "*",// if you add ,urls then is in array
    credentials:true
}))


app.use(express.json());

// app.get("/",(req,res)=>{
//     try{
//         console.log("API hit");
//        return  res.status(200).json({msg:"API WORKS PERFECTLY"});
//     }catch(err){
//         console.log(err)
        
//     }
// })
app.use("/api",REST_routes);

//keep it at end 
app.use(errorHandling);

app.listen(secret.PORT,async()=>{
    console.log(`Server is running at ${secret.PORT}`);
    await connection()
})
//12345 - sunanda