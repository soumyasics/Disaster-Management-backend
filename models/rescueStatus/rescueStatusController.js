const rescueStatus = require("./rescueStatusSchema");

const addRescuestatus =  (req, res) => {
  const emergency = new rescueStatus({
    alertId: req.body.alertid,
    volunteerId: req.body.volunteerid,
    rescueId: req.body.rescueId,
    status:req.body.status,
    date: new Date(),
  });
   emergency
    .save()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Added Successfully",
        // data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};

const viewStatusByVolId=((req,res)=>{
    rescueStatus.find({volunteerId:req.params.id})
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Added Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          err: err,
        });
      });
  
})

const viewStatusById=((req,res)=>{
    rescueStatus.find({_id:req.params.id})
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Added Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          err: err,
        });
      });
})

const viewStatusByrescueId=((req,res)=>{
    rescueStatus.find({rescueId:req.params.id})
    .populate("rescueId")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Data Obtained Successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({
          status: 500,
          err: err,
        });
      });
  
})

const viewAlertStatusByrescueId=((req,res)=>{
  rescueStatus.find({rescueId:req.params.id,alertId:req.body.alertId})
  .populate("alertId")
  .populate("rescueId")
  .exec()
  .then((data) => {
      res.json({
        status: 200,
        msg: "Data Obtained Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        err: err,
      });
    });

})


const viewAlertStatusforuserByvolId=((req,res)=>{
  rescueStatus.find({volunteerId:req.params.id,alertId:req.body.alertId})
  .populate("alertId")
  .populate("volunteerId")
  .exec()
  .then((data) => {
      res.json({
        status: 200,
        msg: "Data Obtained Successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        err: err,
      });
    });

})

const viewStatusByalertId=((req,res)=>{
    rescueStatus.find({alertId:req.params.id})
    .populate("alertId rescueId volunteerId")
    .exec()
    .then((data) => {
        res.json({
          status: 200,
          msg: "Added Successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 500,
          err: err,
        });
      });
  
})


module.exports={
    addRescuestatus,
    viewStatusByVolId,
    viewStatusById,
    viewStatusByrescueId,
    viewStatusByalertId,
    viewAlertStatusByrescueId,
    viewAlertStatusforuserByvolId
}

