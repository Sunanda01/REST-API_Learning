const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const bcrypt_SaltLevel = require("../config/secret").bcrypt_SaltLevel;
const JWT_Hashvalue = require("../config/secret").JWT_Hashvalue;
const validateUser=require('../Helper/validateUser');

const AuthController = {
  async register(req, res, next) {
    // console.log(req.body)
    const { email, password, name, isAdmin } = req.body;
    const {error,value}=await validateUser(req.body);
    if(error){
      return res.status(400).json({error:error.details[0].message});
    }
    //  console.log(typeof(bcrypt_SaltLevel))
    //encryption
    const salt = bcrypt.genSaltSync(Number(bcrypt_SaltLevel));
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new Users({
      name: name,
      email: email,
      password: hashedPassword,
      isAdmin: isAdmin,
    });

    try {
      await newUser.save(); //const user=await newUser.save() => save object of DB we will get
      return res.status(201).json({ MSG: "User Sign up successfully" });
    } catch (err) {
      next(err);
    }
  },
  // async logIn(req, res, next) {
  //   const {email, password}=req.body;
  //   try{
  //     const isExist=await Users.find({email:email});
  //     // console.log(isExist);
  //     if(!isExist){
  //       return res.status(400).json({"msg":"User doesn't exist"}); //Custom error handling =>  return next(customErrorHandling.UserNotExist())
  //     }
  //     const newUser= bcrypt.compareSync(password,isExist.password);

  //     if (!newUser){return res.status(401).json({"msg":"Wrong Credentials"})};

  //     const generateToken= jwt.sign({
  //       id:isExist._id,
  //       isAdmin:isExist.isAdmin
  //     },JWT_Hashvalue);

  //     res.json(isExist,{generateToken:generateToken});
  //   }catch(err){next(err);}
  // },
  async logIn(req, res, next) {
    const { email, password } = req.body;
    try {
      const isExist = await Users.findOne({ email: email });

      if (!isExist) {
        return res.status(400).json({ msg: "User doesn't exist" });
      }

      const isPasswordValid = bcrypt.compareSync(password, isExist.password);

      if (!isPasswordValid) {
        return res.status(401).json({ msg: "Wrong Credentials" });
      }

      const generateToken = jwt.sign(
        {
          id: isExist._id,
          isAdmin: isExist.isAdmin,
        },
        JWT_Hashvalue
      );

      // const {password,isAdmin,__v,...other}=isExist;

      // res.cookie("access_token",generateToken,{httpOnly}).status(201).json(other); // a package needed for access cookies that is cookieparser
      return res.status(200).json({
        msg: "User Login Succesfully",
        user: {
          name: isExist.name,
          email: isExist.email,
          isAdmin: isExist.isAdmin,
          accessToken: generateToken,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};

module.exports = AuthController;
