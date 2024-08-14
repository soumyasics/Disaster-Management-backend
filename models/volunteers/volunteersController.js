const volunteerschema = require('./volunteersSchema');
const secret = 'volunteers'; 
const multer = require("multer");
const nodemailer = require('nodemailer');
const Configue = require('../../Configue');
const users=require('../user/userSchema')
const rescueschema=require("../rescueteam/rescueteamSchema")



const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });

  //Mail configuration of resetpswd
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'supprot.web.application@gmail.com',
      pass: 'ukyw olqq kuql jnty'
    }
  });

  const testMail = (data) => {
    let email=data.email
    const mailOptions = {
      from: 'supprot.web.application@gmail.com',
      to: email,
      subject: 'Reset Password From Web_Guard',
      text: `Dear ${data.name},${'\n'}please check this link : ${Configue.localUrl}${data._id} to reset your password`
    };
  
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log('Error:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
    

// Volenteers Registration
const registervolunteers = async (req, res) => {
  try {
    const volunteer = new volunteerschema({
      name: req.body.name,
      age: req.body.age,
      gender: req.body.gender,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      // city: req.body.city,
      district: req.body.district,
      skills: req.body.skills,
    });

    const existingCustomer1 = await volunteerschema.findOne({ email: req.body.email }).exec();
    const existingCustomer2 = await users.findOne({ email: req.body.email }).exec();
    const existingCustomer3 = await rescueschema.findOne({ email: req.body.email }).exec();

    if (existingCustomer1 || existingCustomer2 || existingCustomer3) {
      return res.status(409).json({
        status: 409,
        msg: "Email Already Registered With Us !!",
        data: null
      });
    }

    const data = await volunteer.save();
    res.json({
      status: 200,
      msg: "Inserted Successfully",
      data: data,
    });

  } catch (err) {
    if (err.code === 11000) {
      let errMsg = "Data not Inserted";
      if (err.keyPattern && err.keyPattern.phone) {
        errMsg = "Contact already in Use";
      } else if (err.keyPattern && err.keyPattern.email) {
        errMsg = "Email Id already in Use";
      }
      return res.status(409).json({
        status: 409,
        msg: errMsg,
        Error: err
      });
    }
    res.status(500).json({
      status: 500,
      msg: "Data not Inserted",
      Error: err
    });
  }
};

//Volenteers Login
const volenteerslogin=((req,res)=>{
    const email=req.body.email
    const password=req.body.password
    volunteerschema.findOne({email:email})
     .exec()
     .then((data)=>{
      if (data.adminApproved === false ) {
        return res.json({
            status: 403,
            msg: "User is not active. Please contact administrator."
        });
    }
    if (data.isActive === false ) {
      return res.json({
          status: 403,
          msg: "User is not active Please contact administrator."
      });
  }

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

   const adminapprovevolunteer = async (req, res) => {
    await volunteerschema.findByIdAndUpdate({ _id: req.params.id }, { adminApproved: true }).exec()
        .then((result) => {
            res.json({
                status: 200,
                data: result,
                msg: 'data updated'
            })
        })
        .catch(err => {
            res.json({
                status: 500,
                msg: 'Error in API',
                err: err
            })
        })

}

const adminviewvolreq = async (req, res) => {
  await volunteerschema.find({ adminApproved: false }).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
          })
      })
      .catch(err => {
          res.json({
              status: 500,
              msg: 'Error in API',
              err: err
          })
      })

}


const adminrejectvolunteer = async (req, res) => {
  await volunteerschema.findByIdAndDelete({ _id: req.params.id }).exec()
      .then((result) => {
          res.json({
              status: 200,
              data: result,
              msg: 'data deleted'
          })
      })
      .catch(err => {
          res.json({
              status: 500,
              msg: 'Error in API',
              err: err
          })
      })

}


// Volunteers Forgot Password

const forgotPwd=((req,res)=>{
  volunteerschema.findByIdAndUpdate({_id:req.params.id},{ password: req.body.password }
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

  //View all Volenteers

  const viewallvolenteers=((req,res)=>{
    volunteerschema.find({adminApproved:true,isActive:true})
    .exec()
    .then((data)=>{
        if(data!=null){
            res.json({
                status:200,
                msg:"Successfullly find",
                data:data
            })
        }
        else{
            res.json({
                status:409,
                msg:"No Data obtained "
            })        
        }
    })
  })

  //View VolunteerById

  
const viewvolenteerById=((req,res)=>{
    volunteerschema.findById({_id:req.params.id})
    .exec()
    .then((data)=>{
      console.log(data);
      
        if(data!=null){
            res.json({
                status:200,
                msg:"Successfullly find",
                data:data
            })
        }
        else{
            res.json({
                status:409,
                msg:"No Data obtained "
            })        
        }
    })
    .catch(err=>{
      console.log(err);
      
      res.json({
          status:500,
          msg:"Data not Updated",
          Error:err
      })
    })
  })
//Edit VolenteerById
const editvolenteerById=(req,res)=>{   
    volunteerschema.findByIdAndUpdate({_id:req.params.id},{
        name: req.body.name,
        age: req.body.age,
        gender: req.body.gender,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        // city: req.body.city,
        state: req.body.state,
        skills: req.body.skills,
        })
  .exec()
  .then(data=>{
    res.json({
        status:200,
        msg:"Updated successfully"
    })
  }).catch(err=>{
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }

  //Delete VolenteerById
  const deactivatevolenteerById=(req,res)=>{
    volunteerschema.findByIdAndUpdate({_id:req.params.id},{isActive:false}).exec()
    .then(data=>{
      console.log(data);
      res.json({
          status:200,
          msg:"Data removed successfully",
          data:data
      })
    
  }).catch(err=>{
    console.log(err);
      res.json({
          status:500,
          msg:"No Data obtained",
          Error:err
      })
  })
  }

  const forgotPWDsentMail=async(req,res)=>{
    let data=null
    try{
         data = await volunteerschema.findOne({ email:  req.body.email })
         if(data==null){
          data = await users.findOne({ email:  req.body.email })
        }
         if(data==null){
          data = await rescueschema.findOne({ email: req.body.email})
        }
        
          if (data != null)
            {
              let id=data._id.toString()
              testMail(data)
            res.json({
              status: 200,
              msg: "Data Obtained successfully",
            });
          }
          else
            res.json({
              status: 500,
              msg: "Enter your Registered MailId",
            });
        }
        catch(err) {
          console.log(err);
          res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err,
          })
        }
    
      }
    
      const searchvolunteerByName = (req, res) => {
        volunteerschema.find({ name: { $regex: req.params.name, $options: 'i' } ,isActive:true})
            .then(user => {
                if (user.length === 0) {
                    return res.status(404).json({ message: 'No Volunteer Found With The Name.' });
                }
                res.status(200).json(user);
            })
            .catch(err => {
                console.error(err);
                res.status(500).json({ message: 'Server Error' });
            });
    }
    

module.exports = {
    registervolunteers,
    volenteerslogin,
    forgotPwd,
    viewallvolenteers,
    viewvolenteerById,
    editvolenteerById,
    deactivatevolenteerById,
    forgotPWDsentMail,
    adminapprovevolunteer,
    adminrejectvolunteer,
    adminviewvolreq,
    searchvolunteerByName
};
