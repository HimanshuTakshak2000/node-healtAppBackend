const mongoose = require("mongoose");

const Uploads = new mongoose.Schema({
    category_image:{
        type: String,
        required: true
    },
    postedById:{
        type: String,
        required: true,
    },
    
},
{
    timestamps: true,
});

module.exports = mongoose.model("uploads",Uploads);

