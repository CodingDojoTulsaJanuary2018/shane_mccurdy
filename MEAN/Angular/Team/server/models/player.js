const mongoose = require('mongoose'),

    PlayerSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength:2, maxlength:50},
        position: {type: String, default: "none", required: false, minlength:2, maxlength:50}, 
    }, {timestamps: false})

mongoose.model('Player', PlayerSchema);