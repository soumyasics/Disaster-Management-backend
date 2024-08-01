const emergencyrescue = require("./emergencyRescueSchema");

const addRescue = async (req, res) => {
  let datas = await emergencyrescue.findOne({
    alertId: req.body.alertId,
    rescueId: req.body.rescueId,
  });
  if (datas) {
    return res.json({
      status: 400,
      msg: "You have already Added this Member",
    });
  }
  const emergency = new emergencyrescue({
    alertId: req.body.alertId,
    volunteerId: req.body.volunteerId,
    rescueId: req.body.rescueId,
    date: new Date(),
  });
  await emergency
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

const viewpendingtasksforRescue=((req, res) => {
  emergencyrescue
    .find({ rescueId: req.params.id, rescueApprove: "pending" })
    .populate("alertId volunteerId")
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
});

const rescueApprovetask = (req, res) => {
  emergencyrescue
    .findByIdAndUpdate({ _id: req.params.id }, { rescueApprove: "approved" })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Approved Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};

const rescuerejecttask = (req, res) => {
  emergencyrescue
    .findByIdAndUpdate({ _id: req.params.id }, { rescueApprove: "reject" })
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Approved Successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};

const viewApprovedtasksforRescue = (req, res) => {
  emergencyrescue
    .find({ rescueId: req.params.id, rescueApprove: "approved" })
    .populate("alertId volunteerId")
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
};
const userviewrescueteams = (req, res) => {
  emergencyrescue
    .find({ alertId: req.params.id, rescueApprove: "approved" })
    .populate("alertId volunteerId rescueId")
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
};

const viewacceptedemrgforvol = (req, res) => {
  emergencyrescue
    .find({ volunteerId: req.params.id})
    .populate("alertId  rescueId")
    .exec()
    .then((data) => {
      const uniqueAlerts = new Set();
      const uniqueData = data.filter((item) => {
        if (uniqueAlerts.has(item?.alertId?.toString())) {
          return false;
        } else {
          uniqueAlerts.add(item?.alertId?.toString());
          return true;
        }
      });
      res.json({
        status: 200,
        msg: "Added Successfully",
        data: uniqueData,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        status: 500,
        err: err,
      });
    });
};

const volviewrescumembers = (req, res) => {
  emergencyrescue
    .find({ alertId: req.params.id,rescueApprove:'approved'})
    .populate("alertId volunteerId rescueId")
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
};

const volremoveresucemember = (req, res) => {
  emergencyrescue
    .findOneAndUpdate({ rescueId:req.params.id },{ rescueApprove: "reject"})
    .exec()
    .then((data) => {
      res.json({
        status: 200,
        msg: "Rescue Member Removed",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        err: err,
      });
    });
};



module.exports = {
  addRescue,
  viewpendingtasksforRescue,
  rescueApprovetask,
  rescuerejecttask,
  viewApprovedtasksforRescue,
  userviewrescueteams,
  viewacceptedemrgforvol,
  volviewrescumembers,
  volremoveresucemember
};
