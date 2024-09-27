const routes=require("express").Router();
const HealthCheckController=require("../controllers/HealthCheck");
const AdminController=require("../controllers/AdminController")
const AuthController=require("../controllers/AuthController");
const {verifyAdmin}=require("../middleware/verifyToken");
routes.get("/health",HealthCheckController.HealthCheck);
routes.post("/signup",AuthController.register);
routes.post("/login",AuthController.logIn);

//admin routes
routes.get("/allUsers",verifyAdmin,AdminController.getAllUsers);

module.exports=routes;