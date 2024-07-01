const mongoose= require("mongoose")

const volunteersSchema=mongoose.Schema({
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
        default:true
    },

    adminApproved:{
        type:Boolean,
        default:false
    }
})
module.exports=mongoose.model ("volunteers",volunteersSchema);