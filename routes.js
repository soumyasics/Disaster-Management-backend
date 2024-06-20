const express=require ("express")
const router=express.Router()

const user=require("./models/user/userController")
const volunteers=require("./models/volunteers/volunteersController")

router.post("/registeruser",user.upload,user.registeruser)
router.post("/userlogin",user.userlogin)
router.post("/userforgotpswd",user.forgotPwd)
router.post("/viewallusers",user.viewalluser)
router.post("/viewuserbyid/:id",user.viewuserbuid)
router.post("/editusrprofile/:id",user.editUserById)
router.post("/deleteuser/:id",user.deleteUserById)



router.post("/registervolunteer",volunteers.registervolunteers)
router.post("/volunteerlogin",volunteers.volenteerslogin)
router.post("/volunteerforgotpassword/:id",volunteers.forgotPwd)
router.post("/viewalladvocates",volunteers.viewallvolenteers)
router.post("/viewvolunteerById/:id",volunteers.viewvolenteerById)
router.post("/deletevolunteerBy/:id",volunteers.deletevolenteerById)
router.post("/forgotPWDsentMail",volunteers.forgotPWDsentMail)


module.exports=router