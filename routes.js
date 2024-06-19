const express=require ("express")
const router=express.Router()

const user=require("./models/user/userController")
const volunteer=require("./models/volunteer/volunteerController")

router.post("/registeruser",user.upload,user.registeruser)
router.post("/userlogin",user.userlogin)
router.post("/userforgotpswd",user.forgotPwd)
router.post("/viewallusers",user.viewalluser)
router.post("/viewuserbyid/:id",user.viewuserbuid)
router.post("/editusrprofile/:id",user.editUserById)
router.post("/deleteuser/:id",user.deleteUserById)

router.post("/registervolunteer",volunteer.registervolunteer)



module.exports=router