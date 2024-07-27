const complaintSchema = require("./complaintSchema");

const addcomplaint =  (req, res) => {
//   let datas = await rescueStatus.findOne({
//     alertId: req.body.alertId,
//     rescueId: req.body.rescueId,
//   });
//   if (datas) {
//     return res.json({
//       status: 400,
//       msg: "You have already Added Update",
//     });
//   }
  const complaint = new complaintSchema({
    alertId: req.body.alertId,
    volunteerId: req.body.volunteerId,
    rescueId: req.body.rescueId,
    details:req.body.details,
    userId:req.body.userId,
    date: new Date(),
  });
  complaint
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

module.exports={
    addcomplaint
}