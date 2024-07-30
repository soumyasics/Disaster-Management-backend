const express=require ("express")
const router=express.Router()

const user=require("./models/user/userController")
const volunteers=require("./models/volunteers/volunteersController")
const rescuemembers=require("./models/rescueteam/rescueteamController")
// const alerts=require("./models/alerts/alertsControler")
const emergency=require("./models/user/Alerts/alertController")
const emergencyrescue=require("./models/volunteers/AssignRescuemember/emergencyRescueController")
const addstatus=require("./models/rescueStatus/rescueStatusController")
const complaints=require("./models/Complaints/complaintController")
const privacypolicy=require('./models/PrivacyPolicy/PrivacyPolicyController')

router.post("/registeruser",user.registeruser)
router.post("/userlogin",user.userlogin)
router.post("/userforgotpswd/:id",user.forgotPwd)
router.post("/viewallusers",user.viewalluser)
router.post("/viewuserbyid/:id",user.viewuserbuid)
router.post("/editusrprofile/:id",user.editUserById)
router.post("/deactivateUserById/:id",user.deactivateUserById)
router.post("/searchuserByName/:name",user.searchuserByName)



router.post("/registervolunteer",volunteers.registervolunteers)
router.post("/volunteerlogin",volunteers.volenteerslogin)
router.post("/volunteerforgotpassword/:id",volunteers.forgotPwd)
router.post("/viewallvolunteers",volunteers.viewallvolenteers)
router.post("/adminviewvolreq",volunteers.adminviewvolreq)
router.post("/viewvolunteerById/:id",volunteers.viewvolenteerById)
router.post("/deactivatevolenteerById/:id",volunteers.deactivatevolenteerById)
router.post("/forgotPWDsentMail",volunteers.forgotPWDsentMail)
router.post("/adminapprovevolunteer/:id",volunteers.adminapprovevolunteer)
router.post("/adminrejectvolunteer/:id",volunteers.adminrejectvolunteer)
router.post("/editvolenteerById/:id",volunteers.editvolenteerById)
router.post("/searchvolunteerByName/:name",volunteers.searchvolunteerByName)




router.post("/registerrescuemembers",rescuemembers.registerrescuemember)
router.post("/rescuememberslogin",rescuemembers.rescuememberlogin)
router.post("/resetPwdrescue/:id",rescuemembers.resetPwdrescue)
router.post("/viewallresquemembers",rescuemembers.viewallresquemembers)
router.post("/viewresquemembersbyid/:id",rescuemembers.viewresquemembersbyid)
router.post("/deactivaterescuemember/:id",rescuemembers.deactivaterescuemember)
router.post("/updaterescuemember/:id",rescuemembers.updaterescuemember)
router.post("/searchrescueByName/:name",rescuemembers.searchrescueByName)
router.post("/viewallresquemembersbyvolid/:id",rescuemembers.viewallresquemembersbyvolid)



//emergency
router.post("/addemergency",emergency.upload,emergency.registeremergency)
router.post("/viewemergencyforadmin",emergency.viewemergencyforadmin)
router.post("/viewemergencybyid/:id",emergency.viewemergencybyid)
router.post("/acceptemergencyreq/:id",emergency.acceptemergencyreq)
router.post("/rejectemergencyreq/:id",emergency.rejectemergencyreq)
router.post("/viewemergencyforallusers",emergency.viewemergencyforallusers)
router.post("/viewemergencybyuserid/:id",emergency.viewemergencybyuserid)
router.post("/viewallalerts",emergency.viewallalerts)
router.post("/viewapprovedalert",emergency.viewapprovedalert)
router.post("/volregisteremergency",emergency.upload,emergency.volregisteremergency)
router.post("/rescueregisteremergency",emergency.upload,emergency.rescueregisteremergency)


//add rescuemember for emergency
router.post("/addrescue",emergencyrescue.addRescue)
router.post("/viewpendingtasksforRescue/:id",emergencyrescue.viewpendingtasksforRescue)
router.post("/rescueApprovetask/:id",emergencyrescue.rescueApprovetask)
router.post("/rescuerejecttask/:id",emergencyrescue.rescuerejecttask)
router.post("/viewApprovedtasksforRescue/:id",emergencyrescue.viewApprovedtasksforRescue)
router.post("/userviewrescueteams/:id",emergencyrescue.userviewrescueteams)
router.post("/viewacceptedemrgforvol/:id",emergencyrescue.viewacceptedemrgforvol)

//add status of rescue
router.post("/addRescuestatus",addstatus.addRescuestatus)
router.post("/viewStatusByVolId/:id",addstatus.viewStatusByVolId)
router.post("/viewStatusById/:id",addstatus.viewStatusById)
router.post("/viewStatusByrescueId/:id",addstatus.viewStatusByrescueId)
router.post("/viewStatusByalertId/:id",addstatus.viewStatusByalertId)

//complaints
router.post("/addcomplaint",complaints.addcomplaint)


//privacy Policy

router.post('/addPrivacyPolicy',privacypolicy.addPrivacyPolicy)
router.post('/viewprivacypolicy',privacypolicy.viewprivacypolicy)
router.post('/privatepolicycount',privacypolicy.privatepolicycount)
router.post('/updateprivacypolicy/:id',privacypolicy.updateprivacypolicy)
router.post('/viewprivacypolicyById/:id',privacypolicy.viewprivacypolicyById)






module.exports=router