const rescuemembersSchema= require('./rescueteamSchema')
const secret = 'rescuemembers'; 
const volunteer=require("../volunteers/volunteersSchema")
const users=require("../user/userSchema")

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  //Rescue Member Register
  const registerrescuemember = async (req, res) => {
    const rescuemember = new rescuemembersSchema({
        name: req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city:req.body.city,
        state:req.body.state,
        skills:req.body.skills,
        volunteerid:req.body.volunteerid
      });
      let existingCustomer1 = await users.findOne({email:req.body.email});
      let existingCustomer2 = await volunteer.findOne({email:req.body.email});
      let existingCustomer3 = await rescuemembersSchema.findOne({email:req.body.email})
  
      if(existingCustomer1||existingCustomer2 ||existingCustomer3){
          return res.json ({
              status : 409,
              msg : "Email Already Registered With Us !!",
              data : null
          })
      }
  
      rescuemember
        .save()
        .then((data) => {
          res.json({
            status: 200,
            msg: "Inserted Successfully",
            data: data,
          });
        })
        .catch((err) => {
          if (err.code === 11000) {
            let errMsg = "Data not Inserted";
            if (err.keyPattern.hasOwnProperty("phone")) {
              errMsg = "Contact already in Use";
            } else if (err.keyPattern.hasOwnProperty("email")) {
              errMsg = "Email Id already in Use";
            }
            return res.status(409).json({
              status: 409,
              msg: errMsg,
              Error: err,
            });
          }
          res.status(500).json({
            status: 500,
            msg: "Data not Inserted",
            Error: err,
          });
        });
};

//Rescue Member Login
const rescuememberlogin=((req,res)=>{
    const email=req.body.email
    const password=req.body.password
    rescuemembersSchema.findOne({email:email})
     .exec()
     .then((data)=>{
      if (data.isActive === false) {
        return res.json({
            status: 403,
          
            msg: "User is not active. Please contact administrator."
        });
    }
  //   if (data.adminapprove === false) {
  //     return res.json({
  //         status: 403,
        
  //         msg: "User is not active. Please contact administrator."
  //     });
  // }

         if(password==data.password){
             res.json({
                 status:200,
                 data:data,
                 msg:"Login Successfully",
              })
         }
         else{
             res.json({
                 status:500,
                 msg:"Pasword error"
             })
         }
     })
     .catch((err)=>{
         res.json({
             status:500,
             msg:"User Not Found"
         })
     })
   })

   const resetPwdrescue=((req,res)=>{
    rescuemembersSchema.findByIdAndUpdate({_id:req.params.id},{ password: req.body.password }
      )
      .exec()
      .then((data) => {
        if (data != null)
          res.json({
            status: 200,
            msg: "Updated successfully",
          });
        else
          res.json({
            status: 500,
            msg: "User Not Found",
          });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 500,
          msg: "Data not Updated",
          Error: err,
        });
      });
  
  })
  
//   const adminapproveresque = async (req, res) => {
//     await rescuemembersSchema.findByIdAndUpdate({ _id: req.params.id }, { adminapprove: true }).exec()
//         .then((result) => {
//             res.json({
//                 status: 200,
//                 data: result,
//                 msg: 'data updated'
//             })
//         })
//         .catch(err => {
//             res.json({
//                 status: 500,
//                 msg: 'Error in API',
//                 err: err
//             })
//         })

// }


  // const adminrejectresque=((req,res)=>{
  //   rescuemembersSchema.findByIdAndDelete({_id:req.params.id}
  //     )
  //     .exec()
  //     .then((data) => {
  //       if (data != null)
  //         res.json({
  //           status: 200,
  //           data:data,
  //           msg: "Activated successfully",
  //         });
  //       else
  //         res.json({
  //           status: 500,
  //           msg: "User Not Found",
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       res.json({
  //         status: 500,
  //         msg: "Data not Updated",
  //         Error: err,
  //       });
  //     });
  
  // })

  // const viewallrescuereq=((req,res)=>{
  //   rescuemembersSchema.find({adminapprove:false})
  //   .exec()
  //   .then((data) => {
  //     if (data != null)
  //       res.json({
  //         status: 200,
  //         msg: "Find successfully",
  //         data:data

  //       });
  //     else
  //       res.json({
  //         status: 500,
  //         msg: "User Not Found",
  //       });
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     res.json({
  //       status: 500,
  //       msg: "Data not Updated",
  //       Error: err,
  //     });
  //   });

  // })


  const viewallresquemembers=((req,res)=>{
    rescuemembersSchema.find({isActive:true,})
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Find successfully",
          data:data

        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });

  })

  const viewallresquemembersbyvolid=((req,res)=>{
    rescuemembersSchema.find({volunteerid:req.params.id, isActive:true})
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Find successfully",
          data:data

        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });

  })


  const viewresquemembersbyid=((req,res)=>{
    rescuemembersSchema.findOne({_id:req.params.id})
    .exec()
    .then((data) => {
      if (data != null)
        res.json({
          status: 200,
          msg: "Find successfully",
          data:data
        });
      else
        res.json({
          status: 500,
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        msg: "Data not Updated",
        Error: err,
      });
    });

  })

  const deactivaterescuemember=((req,res)=>{
    rescuemembersSchema.findByIdAndUpdate({_id:req.params.id},{isActive:false})
    .exec()
    .then((res)=>{
      res.json({
        status:200,
        msg:"Deleted Successfully",
        data:res
      })
    })
    .catch((err)=>{
      res.json({
        status:200,
        msg:err
      })
    })

  })
  const updaterescuemember=((req,res)=>{
    rescuemembersSchema.findByIdAndUpdate({_id:req.params.id},
      {
        name: req.body.name,
        age:req.body.age,
        gender:req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        city:req.body.city,
        state:req.body.state,
        skills:req.body.skills,

      }
    )
    .exec()
    .then((res)=>{
      res.json({
        status:200,
        msg:"Deleted Successfully",
        data:data
      })
    })
    .catch((err)=>{
      res.json({
        status:200,
        msg:err
      })
    })

  })
  const searchrescueByName = (req, res) => {
    rescuemembersSchema.find({ name: { $regex: req.params.name, $options: 'i' } ,isActive:true})
        .then(user => {
            if (user.length === 0) {
                return res.status(404).json({ message: 'No Rescue Member Found With The Name.' });
            }
            res.status(200).json(user);
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ message: 'Server Error' });
        });
}



module.exports={
    registerrescuemember,
    rescuememberlogin,
    resetPwdrescue,
    viewallresquemembers,
    viewresquemembersbyid,
    deactivaterescuemember,
    updaterescuemember,
    searchrescueByName,
    viewallresquemembersbyvolid
}