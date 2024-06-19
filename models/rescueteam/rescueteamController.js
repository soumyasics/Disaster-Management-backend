const rescuemembersSchema= require('./rescueteamSchema')
const secret = 'rescuemembers'; 

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
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
      });
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

module.exports={
    registerrescuemember,
    rescuememberlogin
    
}