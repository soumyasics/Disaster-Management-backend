const mongoose= require("mongoose");

const schema=mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
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
    location:{
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
        type:String,
        required:true
    },
    approvedstatus:{
        type: String,
        default: "pending"
    }
 
});
module.exports = mongoose.model('emergencyalerts', schema);

