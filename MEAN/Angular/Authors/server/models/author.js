//=========== AUTHOR MONGOOSE MODEL ==========//
const mongoose = require('mongoose'),
    Schema = mongoose.Schema; //for relationships

    AuthorSchema = new mongoose.Schema({
        name: {type: String, required: true, minlength:3, maxlength:255},
        quotes: [{type: Schema.Types.ObjectId, ref: 'Quote'}]
    }, {timestamps: true})

mongoose.model('Author', AuthorSchema)
