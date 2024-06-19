const volunteerschema = require('./volunteersSchema');
const secret = 'volunteers'; 

const multer = require("multer");


const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  

// Volenteers Registration
const registervolunteers = async (req, res) => {
  const volenteers = new volunteerschema({
    name: req.body.name,
    age: req.body.age,
    gender: req.body.gender,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    skills: req.body.skills,
  });

  try {
    const data = await volenteers.save();
    res.json({
      status: 200,
      msg: "Inserted Successfully",
      data: data,
    });
  } catch (err) {
    if (err.code === 11000) {
      let errMsg = "Data not Inserted";
      if (err.keyPattern.phone) {
        errMsg = "Contact already in Use";
      } else if (err.keyPattern.email) {
        errMsg = "Email Id already in Use";
      }
      return res.status(409).json({
        status: 11000,
        msg: errMsg,
        Error: err,
      });
    }
    res.status(500).json({
      status: 500,
      msg: "Data not Inserted",
      Error: err,
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

// Volunteers Forgot Password

const forgotPwd=(req,res)=>{  
    volunteerschema.findOneAndUpdate({email:req.body.email},{password:req.body.password})
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

  //View all Volenteers

  const viewallvolenteers=((req,res)=>{
    volunteerschema.find()
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
    volunteerschema.findOne({_id:req.params.id})
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
        city: req.body.city,
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
  const deletevolenteerById=(req,res)=>{
    volunteerschema.findByIdAndDelete({_id:req.params.id}).exec()
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

module.exports = {
    registervolunteers,
    volenteerslogin,
    forgotPwd,
    viewallvolenteers,
    viewvolenteerById,
    editvolenteerById,
    deletevolenteerById,
};
