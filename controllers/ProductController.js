const validateProduct=require('../Helper/validateProduct');
const Products=require('../models/ProductModel');
const fs=require('fs')
const ProController={
    async proRegister(req,res,next){
        const {name,price,qty}=req.body;
        const img=req.file?req.file.path:'';
        const{error,value}=await validateProduct(req.body);
        if(error){
            if(img){
                fs.unlink(img,(unlinkError)=>{
                    if(unlinkError) console.error("Error deleting file:",unlinkError.message);
                });
            }
            return res.status(400).json({error});
        }
        
        try{
            const existProduct=await Products.findOne({name});
            if(existProduct){
                if(img){
                    fs.unlink(img,(unlinkError)=>{
                        if(unlinkError) console.error("Error deleting file:",unlinkError.message);
                    });
                }
                return res.status(409).json({msg:'Product already exists'});
            }
            const newProduct=new Products({
                name,
                price,
                qty,
                img
            });
            await newProduct.save();
            
            return res.status(201).json(
                {msg:'Product entered successfully',
                    product:{
                        id:newProduct._id,
                        name,
                        price,
                        qty,
                        img:newProduct.img                        
                    }
                });
        }catch(err){
            fs.unlink(img,(unlinkError)=>{
                if(unlinkError) console.error("Error deleting file:",unlinkError.message);
            });
            return res.status(500).json({ error: err });
        }
    },
};
module.exports=ProController;