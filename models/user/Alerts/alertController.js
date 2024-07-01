const emergencyschema = require("../Alerts/alertsSchema");
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, res, cb) {
      cb(null, "./upload");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  
  const upload = multer({ storage: storage }).single("image");
  

const registeremergency = (req, res) => {
  const emergency = new emergencyschema({
    userid:req.body.userid,
    title:req.body.title,
    date:req.body.date,
    discription:req.body.discription,
    caterory:req.body.caterory,
    location:req.body.location,
    needs:req.body.needs,
    securitylevel:req.body.securitylevel,
    image:req.file
  });
  emergency
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
            err:err
        })
    });
};


const viewemergencyforadmin = (req, res) => {
    emergencyschema.find({approvedstatus:"pending"})
    .populate('userid')
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data obtained successfully",
          data: data
        })
  
      }).catch(err => {
        console.log(err);
        res.json({
          status: 500,
          msg: "No Data obtained",
          Error: err
        })
      })
  
  }

module.exports={
    registeremergency,upload,
    viewemergencyforadmin
}