const emergencyschema = require("./alertsSchema");
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
    date:new Date(),
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

  const viewallalerts = (req, res) => {
    emergencyschema.find()
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
  const viewapprovedalert = (req, res) => {
    emergencyschema.find({approvedstatus:"accept"})
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

  const viewemergencybyid= (req, res) => {
    emergencyschema.findById({_id:req.params.id})
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

  const acceptemergencyreq = (req, res) => {
    emergencyschema.findByIdAndUpdate({_id:req.params.id},{approvedstatus:"accept"})
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

  const rejectemergencyreq = (req, res) => {
    emergencyschema.findByIdAndDelete({_id:req.params.id})
    .exec()
      .then(data => {
        console.log(data);
        res.json({
          status: 200,
          msg: "Data Deleted successfully",
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

  const viewemergencyforallusers = (req, res) => {
    emergencyschema.find({approvedstatus:"accept"})
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

  const viewemergencybyuserid= (req, res) => {
    emergencyschema.find({userid:req.params.id})
    // .populate('userid')
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
    viewemergencyforadmin,
    viewemergencybyid,
    acceptemergencyreq,
    rejectemergencyreq,
    viewemergencyforallusers,
    viewemergencybyuserid,
    viewapprovedalert,
    viewallalerts
}