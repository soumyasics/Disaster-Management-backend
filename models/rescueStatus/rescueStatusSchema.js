const mongoose= require("mongoose");

const schema=mongoose.Schema({
    alertId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "emergencyalerts",
        required: true,
    },
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "volunteers",
        // required: true,
    },
    rescueId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "rescuemembers",
        // required: true,
    },
    status:{
        type:String,
        required: true,

    },
    date:{
        type:Date,
        required: true,
    }

});
module.exports = mongoose.model('rescuestatus', schema);

