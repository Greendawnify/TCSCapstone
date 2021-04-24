let express = require("express");
let router = express.Router();  //router reference. 
let UserController = require("../controllers/user.controller.js");

//mapping sub path with http methods. 
router.get("/allUserDetails", UserController.getUserDetails);
router.post("/storeUserDetails", UserController.storeUserDetails);
router.post("/signIn", UserController.signInUser);

module.exports=router;