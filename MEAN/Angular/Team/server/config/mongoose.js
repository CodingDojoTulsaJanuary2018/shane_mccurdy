const mongoose = require('mongoose'),
    path  = require("path"),
    models_path = path.join(__dirname,'../models'),
    fs = require('fs')
    
mongoose.connect('mongodb://localhost/TeamManagerAPI');
mongoose.Promise = global.Promise;

fs.readdirSync(models_path).forEach(function(file) {
    if(file.indexOf('.js') >= 0) {
        require(models_path + '/' + file);
   }
})