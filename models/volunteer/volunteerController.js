const volunteerschema=require("./VolunteerSchema")
const multer = require("multer");


// const storage = multer.diskStorage({
//     destination: function (req, res, cb) {
//       cb(null, "./upload");
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.originalname);
//     },
//   });
  
//   const upload = multer({ storage: storage }).single("image");
  
  const registervolunteer = (req, res) => {
    const volunteer = new volunteerschema({
      name: req.body.name,
      address: req.body.address,
      gender: req.body.gender,
      age: req.body.age,
      city: req.body.city,
      state: req.body.state,
      phone: req.body.phone,
      email: req.body.email,
      skills:req.body.skills,
      password: req.body.password,
    });
    volunteer
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

  module.exports={
    registervolunteer
  }
