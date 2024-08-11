const mongoose=require('mongoose')

const schema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
     volunteerId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'volunteers'
    },
    rescueId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'rescuemembers'
    },
    complaintSubject:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },

})

module.exports=mongoose.model('complaints',schema)