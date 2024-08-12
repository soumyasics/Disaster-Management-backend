const complaints=require('./complaintsSchema')

const addcomplaint=(req,res)=>{
    const compalints=new complaints({
        userId:req.body.userId,
        complaintSubject:req.body.complaintSubject,
        date:new Date()

    })
    compalints.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Complaint Registered Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:"Not Registered",
            err:err
        })
    })
}

const addcomplaintbyVolunteer=(req,res)=>{
    const compalints=new complaints({
        volunteerId:req.body.voluneteerId,
        complaintSubject:req.body.complaintSubject,
        date:new Date(),

    })
    compalints.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Complaint Registered Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:"Not Registered",
            err:err
        })
    })
}

const addcomplaintbyRescue=(req,res)=>{
    const compalints=new complaints({
        rescueId:req.body.rescueId,
        complaintSubject:req.body.complaintSubject,
        date:new Date(),

    })
    compalints.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Complaint Registered Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:"Not Registered",
            err:err
        })
    })
}

// view complaints in admin

const viewallcomplaints=(req,res)=>{
    complaints.find()
    .populate("userId")
    .populate('rescueId')
    .populate('volunteerId')
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Data Obtained Successfully',
            data:data,
        })
    })
    .catch((err)=>{
        res.json({
            status:500,
            msg:'Not Obtained Failed'
        })
    })
}

module.exports={
    addcomplaint,
    viewallcomplaints,
    addcomplaintbyVolunteer,
    addcomplaintbyRescue
}