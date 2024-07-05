const express=require ("express")
const router=express.Router()

const user=require("./models/user/userController")
const volunteers=require("./models/volunteers/volunteersController")
const rescuemembers=require("./models/rescueteam/rescueteamController")
const emergency=require("./models/user/Alerts/alertController")

router.post("/registeruser",user.registeruser)
router.post("/userlogin",user.userlogin)
router.post("/userforgotpswd/:id",user.forgotPwd)
router.post("/viewallusers",user.viewalluser)
router.post("/viewuserbyid/:id",user.viewuserbuid)
router.post("/editusrprofile/:id",user.editUserById)
router.post("/deleteuser/:id",user.deleteUserById)



router.post("/registervolunteer",volunteers.registervolunteers)
router.post("/volunteerlogin",volunteers.volenteerslogin)
router.post("/volunteerforgotpassword/:id",volunteers.forgotPwd)
router.post("/viewalladvocates",volunteers.viewallvolenteers)
router.post("/adminviewvolreq",volunteers.adminviewvolreq)
router.post("/viewvolunteerById/:id",volunteers.viewvolenteerById)
router.post("/deletevolunteerBy/:id",volunteers.deletevolenteerById)
router.post("/forgotPWDsentMail",volunteers.forgotPWDsentMail)
router.post("/adminapprovevolunteer/:id",volunteers.adminapprovevolunteer)
router.post("/adminrejectvolunteer/:id",volunteers.adminrejectvolunteer)
router.post("/editvolenteerById/:id",volunteers.editvolenteerById)




router.post("/registerrescuemembers",rescuemembers.registerrescuemember)
router.post("/rescuememberslogin",rescuemembers.rescuememberlogin)
router.post("/resetPwdrescue/:id",rescuemembers.resetPwdrescue)
router.post("/adminapproveresque/:id",rescuemembers.adminapproveresque)
router.post("/adminrejectresque/:id",rescuemembers.adminrejectresque)
router.post("/viewallresquemembers",rescuemembers.viewallresquemembers)
router.post("/viewresquemembersbyid/:id",rescuemembers.viewresquemembersbyid)
router.post("/deleterescuemember/:id",rescuemembers.deleterescuemember)
router.post("/viewallrescuereq",rescuemembers.viewallrescuereq)
router.post("/updaterescuemember/:id",rescuemembers.updaterescuemember)



//emergency
router.post("/addemergency",emergency.upload,emergency.registeremergency)
router.post("/viewemergencyforadmin",emergency.viewemergencyforadmin)
router.post("/viewemergencybyid/:id",emergency.viewemergencybyid)
router.post("/acceptemergencyreq/:id",emergency.acceptemergencyreq)
router.post("/rejectemergencyreq/:id",emergency.rejectemergencyreq)
router.post("/viewemergencyforallusers",emergency.viewemergencyforallusers)
router.post("/viewemergencybyuserid/:id",emergency.viewemergencybyuserid)



module.exports=router