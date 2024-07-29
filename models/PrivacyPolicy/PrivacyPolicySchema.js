const mongoose = require('mongoose')

const schema = mongoose.Schema({
    privacypolicy:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("privacyPolicy",schema)