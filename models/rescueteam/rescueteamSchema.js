const mongoose= require("mongoose")

const rescuemembersSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type: Number,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        unique:true,
        required:true,
        dropDups:true,

    },
    email:{
        type: String,
        unique:true,
        dropDups:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    skills:{
        type:String,
        required:true
    },
    isActive:{
        type:Boolean,
        default:false
    },
    // volunteerid:{
    //     type:mongoose.Schema.Types.ObjectId,
    //     required:true,
    //     ref:'volunteers'
    // }


})
module.exports=mongoose.model ("rescuemembers",rescuemembersSchema);