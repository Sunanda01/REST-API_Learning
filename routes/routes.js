const routes=require("express").Router();
const HealthCheckController=require("../controllers/HealthCheck");
const AdminController=require("../controllers/AdminController")
const AuthController=require("../controllers/AuthController");
const {verifyAdmin,verifyToken}=require("../middleware/verifyToken");
const UserControl=require("../controllers/UserController")


routes.get("/health",HealthCheckController.HealthCheck);
routes.post("/signup",AuthController.register);
routes.post("/login",AuthController.logIn);

//admin routes
routes.get("/allUsers",verifyAdmin,AdminController.getAllUsers);
routes.patch("/accessAdmin/:UserID",verifyAdmin,AdminController.adminAccess);
routes.get("/onlyUsers",verifyAdmin,AdminController.onlyUsers);
routes.get("/onlyUsersCount",verifyAdmin,AdminController.onlyUsersCount);

//user routes
routes.delete("/deleteUser",verifyToken,UserControl.deleteprofile);



module.exports=routes;