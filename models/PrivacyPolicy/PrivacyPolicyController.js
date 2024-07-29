const privacyPolicy = require('./PrivacyPolicySchema')

const addPrivacyPolicy =(req,res)=>{
    let data = new privacyPolicy({privacypolicy:req.body.privacypolicy})
    data.save()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Privacy Policy Added Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:'Error Found',
            err:err
        })
    })
}

const viewprivacypolicy=(req,res)=>{
    privacyPolicy.findOne()
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Data Obtained Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:'Error Found',
            err:err
        })
    })
}

const viewprivacypolicyById=(req,res)=>{
    privacyPolicy.findById({_id:req.params.id})
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Data Obtained Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:'Error Found',
            err:err
        })
    })
}

const privatepolicycount=(req,res)=>{
    privacyPolicy.find()
    .exec()
    .then(data=>{
    if(data.length>0){
        return  res.json({
            status: 200,
            msg: "Retrieved Successfully",
            data:data.length
            
          });
         }
         else{
           return  res.json({
             status: 200,
             msg: "Retrieved Successfully",
             data:0
             
           });
         }
        })
        .catch((err) => {
          console.log(err);
          res.json({
            status: 500,
              msg: "Internal Error !!"
          })
        })
}

const updateprivacypolicy=(req,res)=>{
    privacyPolicy.findByIdAndUpdate({_id:req.params.id},{
        privacypolicy:req.body.privacypolicy
    })
    .exec()
    .then((data)=>{
        res.json({
            status:200,
            msg:'Policy Updated Successfully',
            data:data
        })
    })
    .catch((err)=>{
        console.log(err);
        res.json({
            status:500,
            msg:'Not Updated ',
            err:err
        })
    })

}

module.exports={
    addPrivacyPolicy,
    viewprivacypolicy,
    privatepolicycount,
    updateprivacypolicy,
    viewprivacypolicyById
}