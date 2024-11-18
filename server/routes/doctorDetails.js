const express=require("express");
const router=express.Router();
const {validateJwtToken}=require("../Middleware/jwtMiddleware");
const{
    docDetails,getDoctors
}=require("../Controllers/doctorDetailsController");

//route for registration
router.post("/details",validateJwtToken, docDetails);

// GET route for retrieving doctor details
router.get("/details", getDoctors); // New GET route
//route for user login 
//router.post("/login",loginUser);
module.exports=router;