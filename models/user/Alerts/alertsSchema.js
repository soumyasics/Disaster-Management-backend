const mongoose= require("mongoose");

const schema=mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        // required: true,
    },
    volid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteers",
    },
    rescueid:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rescuemembers",
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    discription:{
        type:String,
        required:true
    },
    caterory:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    needs:{
        type:String,
        required:true
    },
    securitylevel:{
        type:String,
        required:true
    },
    image:{
        type:Object,
        required:true
    },
    approvedstatus:{
        type: String,
        default: "pending"
    }
 
});
module.exports = mongoose.model('emergencyalerts', schema);

