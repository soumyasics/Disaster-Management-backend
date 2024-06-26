const userschema=require("./userSchema")
const multer = require("multer");
const volunteers=require("../volunteers/volunteersSchema")
const rescuemember=require("../rescueteam/rescueteamSchema")


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).single("image");
  
  const registeruser =async (req, res) => {
    const shops = new userschema({
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
      // image: req.file,
    });
    let existingCustomer1 = await userschema.findOne({email:req.body.email});
    let existingCustomer2 = await volunteers.findOne({email:req.body.email});
    let existingCustomer3 = await rescuemember.findOne({email:req.body.email})

    if(existingCustomer1||existingCustomer2 ||existingCustomer3){
        return res.json ({
            status : 409,
            msg : "Email Already Registered With Us !!",
            data : null
        })
    }
    let existingCustomerByPhone = await userschema.findOne({ phone: req.body.phone });
    if (existingCustomerByPhone) {
      return res.status(409).json({
        status: 409,
        msg: "Contact already in Use",
        data: null
      });
    }
    shops
      .save()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Inserted Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status:500,
          msg:err
      })
  })

      //   if (err.code === 11000) {
      //     let errMsg = "Data not Inserted";
      //     if (err.keyPattern.hasOwnProperty("phone")) {
      //       errMsg = "Contact already in Use";
      //     } else if (err.keyPattern.hasOwnProperty("email")) {
      //       errMsg = "Email Id already in Use";
      //     }
      //     return res.status(409).json({
      //       status: 409,
      //       msg: errMsg,
      //       Error: err,
      //     });
      //   }
      //   res.status(500).json({
      //     status: 500,
      //     msg: "Data not Inserted",
      //     Error: err,
      //   });
      // });
  };
  //user registration completed

  const userlogin=((req,res)=>{
   const email=req.body.email
   const password=req.body.password
    userschema.findOne({email:email})
    .exec()
    .then((data)=>{
        if(password==data.password){
            res.json({
                status:200,
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

  //user login completed

  const forgotPwd=(req,res)=>{  
    userschema.findByIdAndUpdate({_id:req.params.id},{password:req.body.password})
  .exec()
  .then(data=>{
    if(data!=null)
    res.json({
        status:200,
        msg:"Updated successfully"
    })
    else
    res.json({
      status:500,
      msg:"User Not Found"
     
  })
  }).catch(err=>{
    console.log(err);
    res.json({
        status:500,
        msg:"Data not Updated",
        Error:err
    })
  })
  }

//userforget pswd completed

  const viewalluser=((req,res)=>{
    userschema.find()
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
//view all users completed

const viewuserbuid=((req,res)=>{
    userschema.findOne({_id:req.params.id})
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
  //view userby id completed

  const editUserById=(req,res)=>{   
    userschema.findByIdAndUpdate({_id:req.params.id},{
      name: req.body.name,
      address: req.body.address,
      phone: req.body.phone,
      email: req.body.email,
      password: req.body.password,
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
//edit user profile completed

const deleteUserById=(req,res)=>{
    userschema.findByIdAndDelete({_id:req.params.id}).exec()
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

  module.exports={
            registeruser,
            userlogin,
            forgotPwd,
            viewalluser,
            viewuserbuid,
            editUserById,
            deleteUserById
  }
  
  