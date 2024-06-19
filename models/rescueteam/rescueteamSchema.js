const mongoose= require("mongoose")

const rescuemembersSchema=mongoose.Schema({
    name:{
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
    address:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
module.exports=mongoose.model ("rescuemembers",rescuemembersSchema);