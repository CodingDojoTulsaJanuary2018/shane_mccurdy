const mongoose = require('mongoose'),

    GameSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength:2, maxlength:50},
        roster: [] 
    }, {timestamps: false})

mongoose.model('Game', GameSchema)