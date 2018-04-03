//=========== QUOTE MONGOOSE MODEL ==========//
const mongoose = require('mongoose'),
    Schema = mongoose.Schema, //for relationships

    QuoteSchema = new mongoose.Schema({
        quote: {type: String, required: true, minlength:3, maxlength:255},
        rank: {type: Number, default:0},
        _author: {type: Schema.Types.ObjectId, ref: 'Author'}
    }, {timestamps: true})

mongoose.model('Quote', QuoteSchema)