const mongoose=require('mongoose')

const schema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    complaintSubject:{
        type:String,
        required:true
    }
})

module.exports=mongoose.model('complaints',schema)